import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { appConfig } from './utils/bootstrap-config-service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(cookieParser());
  const docsOptions = new DocumentBuilder()
    .setTitle('Liberet Challenge')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  const document = SwaggerModule.createDocument(app, docsOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.getNumber('PORT', 3000), '0.0.0.0');

  process.on('SIGTERM', async () => {
    console.info('SIGTERM signal received. Closing app...');
    await app.close();
    process.exit(0);
  });
}

bootstrap();
