import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';

@Injectable()
export class AppService {
  desktopPath = `${process.env.HOME}/Desktop`;

  get trashPath(): string {
    return `${this.desktopPath}/.tmp`;
  }

  get needInitialization(): boolean {
    return !existsSync(this.trashPath);
  }

  get hasFile(): boolean {
    return !!readdirSync(this.desktopPath).filter(file => !file.match(/^\./))
      .length;
  }

  public cleanup() {
    if (this.needInitialization) {
      this.init();
    }
    if (!this.hasFile) {
      return console.log('No file to clean up!');
    }
    execSync(`mv ${this.desktopPath}/* ${this.trashPath}`);
    console.log('Cleanup completed!');
  }

  private init() {
    execSync(`mkdir ${this.trashPath}`);
    console.log('Initialization completed');
  }
}
