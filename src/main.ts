import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
        retryAttempts: 3,
        retryDelay: 1000,
      },
    },
  );
  await app.listen();
}

bootstrap();
