#!/usr/bin/env bash
# Location: repo root (~/Documents/flexpay-mini)

set -euo pipefail

ROOT="${ROOT:-$HOME/Documents/flexpay-mini}"
COMPOSE="$ROOT/infra/docker-compose.yml"
API_PORT="${PORT:-3000}"
MOCK_PORT="${MOCK_PORT:-4801}"
WEB_PORT="${WEB_PORT:-4200}"
PIDS_DIR="$ROOT/.dev/pids"
LOG_DIR="$ROOT/.dev/logs"

mkdir -p "$PIDS_DIR" "$LOG_DIR"

log()  { printf "\033[1;36m%s\033[0m\n" "$*"; }
warn() { printf "\033[1;33m%s\033[0m\n" "$*"; }
err()  { printf "\033[1;31m%s\033[0m\n" "$*" >&2; }

is_listening() { ss -lnt "sport = :$1" 2>/dev/null | grep -q ":$1"; }
kill_port()    { lsof -ti ":$1" 2>/dev/null | xargs -r kill -9 || true; }

wait_port() {
  port="$1"; name="${2:-service}"; tries="${3:-60}"
  i=1
  while [ "$i" -le "$tries" ]; do
    if is_listening "$port"; then
      log "✅ $name is listening on :$port"
      return 0
    fi
    sleep 0.5
    i=$((i+1))
  done
  err "❌ Timed out waiting for $name on :$port"
  return 1
}

wait_http_ok() {
  url="$1"; name="${2:-endpoint}"; tries="${3:-60}"
  i=1
  while [ "$i" -le "$tries" ]; do
    if curl -fsS -o /dev/null "$url"; then
      log "✅ $name healthy: $url"
      return 0
    fi
    sleep 0.5
    i=$((i+1))
  done
  warn "⚠️  $name did not report healthy in time: $url"
  return 1
}

start_docker() {
  log "🐳 Starting Docker services (Postgres, Redis)…"
  docker compose -f "$COMPOSE" up -d
}

stop_docker() {
  log "🛑 Stopping Docker services…"
  docker compose -f "$COMPOSE" down || true
}

start_mock() {
  log "▶️  Starting processor-mock…"
  kill_port "$MOCK_PORT"
  # Detach completely; write logs per service
  nohup npm --prefix "$ROOT/apps/processor-mock" run dev \
    > "$LOG_DIR/processor-mock.out" 2>&1 < /dev/null &
  echo $! > "$PIDS_DIR/mock.pid"
  wait_port "$MOCK_PORT" "processor-mock" 40 || true
  wait_http_ok "http://localhost:$MOCK_PORT/health" "processor-mock /health" 40 || true
}

start_api() {
  log "▶️  Starting API…"
  kill_port "$API_PORT"
  nohup npm --workspace "apps/api" --prefix "$ROOT" run dev \
    > "$LOG_DIR/api.out" 2>&1 < /dev/null &
  echo $! > "$PIDS_DIR/api.pid"
  wait_port "$API_PORT" "API (Nest)" 80 || warn "API may be on a fallback port"
}

start_web() {
  log "▶️  Starting Angular dev server…"
  kill_port "$WEB_PORT"
  nohup npm --workspace "apps/web" --prefix "$ROOT" run dev \
    > "$LOG_DIR/web.out" 2>&1 < /dev/null &
  echo $! > "$PIDS_DIR/web.pid"
  wait_port "$WEB_PORT" "Angular (ng serve)" 80 || true
}

stop_node_procs() {
  log "🧹 Stopping Node dev processes…"
  # From pidfiles
  for f in "$PIDS_DIR/mock.pid" "$PIDS_DIR/api.pid" "$PIDS_DIR/web.pid"; do
    if [ -f "$f" ]; then
      pid="$(cat "$f" 2>/dev/null || true)"
      if [ -n "${pid:-}" ]; then kill -9 "$pid" 2>/dev/null || true; fi
      rm -f "$f"
    fi
  done
  # By pattern (belt-and-suspenders)
  pkill -f "apps/processor-mock" 2>/dev/null || true
  pkill -f "apps/api"            2>/dev/null || true
  pkill -f "ng serve"            2>/dev/null || true
  # Free well-known ports
  kill_port "$API_PORT"
  kill_port "$MOCK_PORT"
  kill_port "$WEB_PORT"
}

status() {
  log "🔎 Status"
  printf "Ports:\n"
  for p in "$API_PORT" "$MOCK_PORT" "$WEB_PORT" 5432 6379; do
    if is_listening "$p"; then
      printf "  :%-5s  LISTENING\n" "$p"
    else
      printf "  :%-5s  (free)\n" "$p"
    fi
  done
  printf "\nDocker:\n"
  docker compose -f "$COMPOSE" ps
  printf "\nLogs: %s\n" "$LOG_DIR"
}

run_prisma() {
  if [ -d "$ROOT/apps/api" ]; then
    log "🧭 Running Prisma generate & migrate…"
    (
      cd "$ROOT/apps/api"
      npx prisma generate
      npx prisma migrate dev --name auto_up
    ) || warn "⚠️ Prisma step failed (check DATABASE_URL and DB availability)"
  else
    warn "⚠️ Skipping Prisma: apps/api not found"
  fi
}

case "${1:-}" in
  up)
    start_docker
    wait_port 5432 "Postgres" 60 || true
    run_prisma
    start_mock
    start_api
    start_web
    log "🚀 Stack is up (detached). Tail logs with: tail -f $LOG_DIR/*.out"
    ;;
  down)
    stop_node_procs
    stop_docker
    log "✅ Stack is down."
    ;;
  restart)
    "$0" down
    sleep 1
    "$0" up
    ;;
  logs)
    log "📜 Tailing Docker logs… (Ctrl-C to stop)"
    docker compose -f "$COMPOSE" logs -f
    ;;
  status)
    status
    ;;
  help|*)
    cat <<USAGE
Usage: $(basename "$0") {up|down|restart|logs|status}
  up       - start Docker + processor-mock + API + Angular (detached)
  down     - stop Node procs, free ports, stop Docker
  restart  - down then up
  logs     - follow Docker logs
  status   - show port listeners and compose ps
USAGE
    ;;
esac
