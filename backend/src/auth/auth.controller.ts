import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordResetDto } from './dto/password-reset.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // POST /auth/register
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // POST /auth/logout
  @Post('logout')
  async logout(@Body() body: { token: string }) {
    return this.authService.logout(body.token);
  }

  // GET /auth/me: Obtener el perfil del usuario autenticado
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async profile(@Query('token') token: string) {
    return this.authService.getProfile(token);
  }

  // TODO: hacer un path auth/me tipo patch para actualizar los datos del usuario

  // POST /auth/password-reset
  @Post('password-reset')
  async passwordReset(@Body() passwordResetDto: PasswordResetDto) {
    return this.authService.passwordReset(passwordResetDto);
  }

  // GET /auth/verify-email
  @Get('verify-email')
  async verifyEmail(@Query('verificationCode') verificationCode: string) {
    return this.authService.verifyEmail({ verificationCode });
  }

  // POST /auth/generate-jwt
  @Post('generate-jwt')
  async generateJwt(@Body() body: { uid: string, email: string }) {
    const { uid, email } = body;
    return { token: await this.authService.generateJwt(uid, email) };
  }
}
