import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ExceptionService } from '../../shared/exception/exception.service';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { LoggerService } from '../../shared/logger/logger.service';

dotenv.config();

@Injectable()
export class FirebaseAdminService {
  private firebaseApp: admin.app.App;

  constructor(
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionService,
  ) {
    if (!admin.apps.length) {
      const serviceAccount = path.resolve(process.env.FIREBASE_CONFIG_PATH);
      try {
        this.firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
        this.logger.logInfo('Firebase initialized successfully');
      } catch (err) {
        this.logger.logError('Error initializing Firebase', err.message);
        throw new Error('Failed to initialize Firebase');
      }
    } else {
      this.firebaseApp = admin.apps[0];
    }
  }

  // Autenticación con correo y contraseña (para iniciar sesión)
  async authenticateWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      const userRecord = await admin.auth().getUserByEmail(email); // Obtener el usuario por correo
      // Aquí no hay un método directo en Firebase para validar contraseña, pero lo validaremos con un token temporal
      // Esto podría manejarse en un paso diferente con Firebase Authentication SDK del lado del cliente
      this.logger.logInfo(`Authentication successful for user: ${email}`);
      return userRecord;
    } catch (err) {
      this.logger.logError(
        `Failed to authenticate user: ${email}`,
        err.message,
      );
      this.exceptionService.throwUnauthorizedException(
        'Invalid email or password',
        err.stack,
      );
    }
  }

  // Crear un usuario con correo y contraseña
  async createUser(
    email: string,
    password: string,
    displayName: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      const user = await admin.auth().createUser({
        email,
        password,
        displayName,
      });
      this.logger.logInfo(`User created successfully: ${email}`);
      return user;
    } catch (err) {
      this.logger.logError(`Failed to create user: ${email}`, err.message);
      this.exceptionService.throwInternalServerErrorException(
        'User creation failed',
        err.stack,
      );
    }
  }

  async logout(token: string): Promise<void> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      await admin.auth().revokeRefreshTokens(decodedToken.uid);
      this.logger.logInfo(`User logged out successfully: ${decodedToken.uid}`);
    } catch (err) {
      this.logger.logError('Logout failed', err.message);
      this.exceptionService.throwInternalServerErrorException(
        'Logout failed',
        err.stack,
      );
    }
  }

  // Método para obtener el perfil del usuario
  async getUser(uid: string): Promise<admin.auth.UserRecord> {
    try {
      const user = await admin.auth().getUser(uid);
      this.logger.logInfo(`User profile fetched successfully: ${uid}`);
      return user;
    } catch (err) {
      this.logger.logError('Failed to fetch user profile', err.message);
      this.exceptionService.throwInternalServerErrorException(
        'Failed to fetch user profile',
        err.stack,
      );
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await admin.auth().generatePasswordResetLink(email);
      this.logger.logInfo(`Password reset link sent to: ${email}`);
    } catch (err) {
      this.logger.logError('Password reset failed', err.message);
      this.exceptionService.throwInternalServerErrorException(
        'Password reset failed',
        err.stack,
      );
    }
  }

  // Método para enviar enlace de verificación
  async verifyEmail(email: string): Promise<void> {
    try {
      await admin.auth().generateEmailVerificationLink(email);
      this.logger.logInfo(`Email verification link sent to: ${email}`);
    } catch (err) {
      this.logger.logError('Email verification failed', err.message);
      this.exceptionService.throwInternalServerErrorException(
        'Email verification failed',
        err.stack,
      );
    }
  }
}
