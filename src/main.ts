import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: 'http://localhost:3333'
    }
  });

  app.set('trusty proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Xbox-Live')
    .setDescription('Aplicação para marketplace de jogos para Xbox')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('games')
    .addTag('gender')
    .addTag('user')
    .addTag('profile')
    .addBearerAuth()
    .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
