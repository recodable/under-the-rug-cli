import { KhalaFactory } from '@recodable/khala';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await KhalaFactory.create(AppModule, { logger: false });
  await app.execute(process.argv);
}
bootstrap();
