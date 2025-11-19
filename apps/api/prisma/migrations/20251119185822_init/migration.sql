-- CreateTable
CREATE TABLE "ProcessorEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "authId" TEXT,
    "amountCents" INTEGER NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessorEvent_pkey" PRIMARY KEY ("id")
);
