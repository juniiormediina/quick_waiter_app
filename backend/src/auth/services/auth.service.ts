import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseAdminService } from '../../firebase/services/firebase-admin.service';
import { ExceptionService } from '../../shared/exception/exception.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { PasswordResetDto } from '../dto/password-reset.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { LoggerService } from '../../shared/logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseAdminService: FirebaseAdminService,
    private readonly exceptionService: ExceptionService,
    private readonly loggerService: LoggerService,
    private readonly jwtService: JwtService,
  ) {}

  // POST /auth/login
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const { email, password } = loginDto;

      // Autenticamos con Firebase usando correo y contraseña
      const userRecord =
        await this.firebaseAdminService.authenticateWithEmailAndPassword(
          email,
          password,
        );

      // Generamos un JWT personalizado del backend para el usuario autenticado
      const jwtToken = this.jwtService.sign({
        uid: userRecord.uid,
        email: userRecord.email,
      });

      this.loggerService.logInfo(`Login successful for user: ${email}`);
      return { token: jwtToken }; // Retornamos el JWT del backend
    } catch (error) {
      this.exceptionService.throwUnauthorizedException(
        'Login failed',
        error.stack,
      );
    }
  }

  // POST /auth/create
  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { email, password, name } = createUserDto;
      const user = await this.firebaseAdminService.createUser(
        email,
        password,
        name,
      );
      this.loggerService.logInfo(`User created successfully: ${email}`);
      return { user };
    } catch (error) {
      this.exceptionService.throwInternalServerErrorException(
        'User creation failed',
        error.stack,
      );
    }
  }

  // POST /auth/logout:
  async logout(token: string): Promise<void> {
    try {
      await this.firebaseAdminService.logout(token);
      this.loggerService.logInfo('User logged out successfully');
    } catch (error) {
      this.exceptionService.throwInternalServerErrorException(
        'Logout failed',
        error.stack,
      );
    }
  }

  // GET /auth/profile: Obtener el perfil del usuario autenticado
  async getProfile(token: string): Promise<any> {
    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      const userProfile = await this.firebaseAdminService.getUser(
        decodedToken.uid,
      );
      this.loggerService.logInfo('User profile fetched successfully');
      return { userProfile };
    } catch (error) {
      this.exceptionService.throwUnauthorizedException(
        'Failed to fetch profile',
        error.stack,
      );
    }
  }

  // POST /auth/password-reset
  async passwordReset(passwordResetDto: PasswordResetDto): Promise<void> {
    try {
      const { email } = passwordResetDto;
      await this.firebaseAdminService.requestPasswordReset(email);
      this.loggerService.logInfo(
        `Password reset requested for email: ${email}`,
      );
    } catch (error) {
      this.exceptionService.throwInternalServerErrorException(
        'Password reset failed',
        error.stack,
      );
    }
  }

  // GET /auth/verify-email
  async verifyEmail(verifyEmailDto: VerifyEmailDto): Promise<void> {
    try {
      const { verificationCode } = verifyEmailDto;
      await this.firebaseAdminService.verifyEmail(verificationCode);
      this.loggerService.logInfo('Email verification process initiated');
    } catch (error) {
      this.exceptionService.throwInternalServerErrorException(
        'Email verification failed',
        error.stack,
      );
    }
  }

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
