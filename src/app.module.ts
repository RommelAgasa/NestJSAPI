import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // This loads your .env file so you can access 
    // environment variables inside your NestJS app
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // makes the ConfigService available in all modules (no need to import it everywhere).
    }),

    // This connects your app to MongoDB, but 
    // asynchronously — meaning it waits for the 
    // environment configuration to be ready first.
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      // This is a factory function — it runs at runtime 
      // and returns the configuration object that Mongoose will use.
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGO_URI'),
      }),
    }),
    BookModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


/**
 * Run the command below to install the required packages:
 * npm install @nestjs/mongoose mongoose
 * npm install @nestjs/config
 */

// npm run start:dev to start the server