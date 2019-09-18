import { NestZeroFactory } from '../packages/nest-zero';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestZeroFactory.create(AppModule);
  await app.execute();
}
bootstrap();
