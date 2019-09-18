import { Controller } from '../packages/nest-zero';
// import { AppService } from './app.service';

@Controller('main')
export class AppController {
  run() {
    console.log('appcontroller@run');
  }
}
