import { Controller } from '@recodable/khala';
import { Command } from '@recodable/khala';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Command({
    signature: 'clean',
    description: 'Clean up all the targeted directory.',
  })
  clean() {
    this.appService.cleanup();
  }

  @Command({
    signature: 'add <path>',
    description: 'Add a directory path to the target directory list.'
  })
  add(path: string) {
    this.appService.add(path);
  }
}
