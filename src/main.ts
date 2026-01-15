import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { printStartupBanner } from './shared/utils/startup-banner.util';
import { GlobalExceptionFilter } from './shared/filters/http-exception.filter';
import { APP_CONSTANTS } from './shared/constants';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.useGlobalFilters(new GlobalExceptionFilter());

    const config = new DocumentBuilder()
      .setTitle('OMNI Technical Challenge')
      .setDescription(
        'API REST para simular um sistema simples de transacoes monetarias entre usuarios',
      )
      .setVersion('1.0')
      .addTag('users', 'Operacoes de usuarios')
      .addTag('transfer', 'Operacoes de transferencia')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    const port = process.env.PORT ?? APP_CONSTANTS.DEFAULT_PORT;
    await app.listen(port);

    printStartupBanner(Number(port));
  } catch (error) {
    logger.error(
      'Failed to start application',
      error instanceof Error ? error.stack : String(error),
    );
    process.exit(1);
  }
}

bootstrap();
