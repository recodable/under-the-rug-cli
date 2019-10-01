import { Controller } from 'khala';
import { Command } from 'khala';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Command('clean')
  clean() {
    this.appService.cleanup();
  }

  @Command('add <path>')
  add(path: string) {
    this.appService.add(path);
  }
}
