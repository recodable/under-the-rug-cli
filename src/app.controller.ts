import { Controller } from '../packages/nest-zero';
import { Command } from '../packages/nest-zero';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Command()
  clean() {
    this.appService.cleanup();
  }
}
