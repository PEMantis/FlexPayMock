import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject(JwtService)
  private readonly jwtService!: JwtService;

  constructor() {
    console.log('AuthService constructed, jwtService exists:', !!this.jwtService);
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    console.log('AuthService.register, jwtService =', this.jwtService);
    const payload = { sub: email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
