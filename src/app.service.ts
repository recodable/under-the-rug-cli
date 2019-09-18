import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync } from 'fs';

@Injectable()
export class AppService {
  desktopPath = `${process.env.HOME}/Desktop`;

  get trashPath(): string {
    return `${this.desktopPath}/.tmp`;
  }

  get needInitialization(): boolean {
    return !existsSync(this.trashPath);
  }

  public cleanup() {
    if (this.needInitialization) {
      this.init();
    }
    execSync(`mv ${this.desktopPath}/* ${this.trashPath}`);
    console.log('Cleanup completed!');
  }

  private init() {
    execSync(`mkdir ${this.trashPath}`);
    console.log('Initialization completed');
  }
}
