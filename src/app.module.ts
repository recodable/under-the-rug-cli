import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './database/database.service';
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
    {
      provide: DatabaseService,
      useValue: new DatabaseService({
        targetDirs: [`${process.env.HOME}/Desktop`],
      }),
    },
  ],
})
export class AppModule {}
