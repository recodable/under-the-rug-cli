import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import * as path from 'path';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: ConfigService,
      useValue: new ConfigService(path.resolve(__dirname, '..', '.env')),
    },
  ],
})
export class AppModule {}
