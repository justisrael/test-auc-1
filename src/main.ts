import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Auction server is running on: http://localhost:${port}`);
  console.log(`📡 SSE endpoint: http://localhost:${port}/bids/events`);
}
bootstrap();
