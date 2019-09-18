import { Controller } from '../packages/nest-zero';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  run() {
    console.log('appcontroller@run');
  }
}
