import { NestZeroFactory } from '../packages/nest-zero';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestZeroFactory.create(AppModule);
  // const app = await NestZeroFactory.createCLI(AppModule);
  await app.execute(process.argv);
}
bootstrap();
