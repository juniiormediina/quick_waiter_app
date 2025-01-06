import { JwtService } from '@nestjs/jwt';
import { ExceptionService } from '../exception/exception.service';

export class JwtUtils {
  constructor(
    private readonly jwtService: JwtService,
    private readonly exceptionService: ExceptionService,
  ) {}

  // Método de utilidad para verificar un token JWT (usado para rutas protegidas)
  async verifyJwtToken(token: string): Promise<any> {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      this.exceptionService.throwUnauthorizedException(
        'Invalid token',
        error.stack,
      );
    }
  }

  // Método para generar un JWT
  async generateJwt(uid: string, email: string): Promise<string> {
    const payload = { uid, email };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
