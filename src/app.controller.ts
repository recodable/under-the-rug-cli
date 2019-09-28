import { Controller } from 'nest-zero';
import { Command } from 'nest-zero';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Command()
  clean() {
    this.appService.cleanup();
  }

  // @Command('add <path>')
  // add(path: string) {
  //   this.appService.add(path);
  // }
}
