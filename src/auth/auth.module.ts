import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    /**
     * JWT (JSON Web Token)
     * is a secure, compact way to represent 
     * and share data (like user identity) 
     * between two parties — usually a client 
     * (frontend) and a server (backend).
     */

    /***
     * JwtModule — JWT functionality for NestJS
     * This comes from @nestjs/jwt, which wraps the jsonwebtoken library.
     * It allows you to:
     *    Sign tokens (in AuthService).
     *    Validate tokens (in JwtStrategy).
     *    Configure how long tokens last, what secret key to use, etc.
     * 
     * .registerAsync() — Async configuration
     *  we use registerAsync() to dynamically load them at runtime, usually from environment variables.
     *  This is useful because:
     *    Your secret and expiration time are stored securely in .env.
     *    You can change them without modifying code.
     */
    JwtModule.registerAsync({
      /**
       * This makes sure that the ConfigService (from @nestjs/config) is available to be injected here.
       * Without this, NestJS wouldn’t know where to get configuration values.
       */
      imports: [ConfigModule],

      /**
       * inject: [ConfigService]
       * This tells NestJS:
       *  “Before running the factory function below, give me an instance of ConfigService.”
       * That way, the next function can use it to read .env values.
       */
      inject: [ConfigService],

      /***
       * useFactory: (configService: ConfigService) => ({ ... })
       * This is a factory function that returns the configuration object for JwtModule.
       * It uses the injected ConfigService to read JWT_SECRET and JWT_EXPIRES from .env.
       */
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRES') as any,
        },
      }),
      /**
       * So your JwtModule becomes configured like this behind the scenes:
       * JwtModule.register({
       *    secret: 'rommel_agasa',
       *    signOptions: { expiresIn: '3d' },
       * });
       */
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}


/**
 * 
 * Run this command for authentication
 *    npm install --save @nestjs/passport passport passport-local
 *    npm install --save-dev @types/passport-local
 *    npm install --save @nestjs/jwt --save
 * 
 * Then create auth folder with auth.module.ts, auth.service.ts, auth.controller.ts
 * 
 * 
 * Go to .env file and add JWT_SECRET_KEY=your_secret_key and JWT_EXPIRE=3d
 *    JWT_SECRET=rommel_agasa
 *    JWT_EXPIRES=3d
 */
