import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

class AuthDto {
  email!: string;
  password!: string;
}

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly authService!: AuthService;

  constructor() {
    console.log('AuthController constructed');
  }

  @Post('register')
  async register(@Body() body: AuthDto) {
    console.log(
      'AuthController.register called, this.authService =',
      this.authService,
    );
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: AuthDto) {
    return this.authService.login(body.email, body.password);
  }
}
