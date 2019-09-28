import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  private readonly trashDir = '.tmp';
  private readonly desktopPath = `${process.env.HOME}/Desktop`;

  constructor(private readonly db: DatabaseService) {}

  trashPath(path: string): string {
    return `${path}/${this.trashDir}`;
  }

  needInitialization(path: string): boolean {
    return !existsSync(this.trashPath(path));
  }

  hasFile(path: string): boolean {
    return !!readdirSync(this.desktopPath).filter(file => !file.match(/^\./))
      .length;
  }

  public cleanup() {
    this.db.instance
      .get('targetPaths')
      .value()
      .forEach(path => {
        if (this.needInitialization(path)) {
          this.init(path);
        }
        if (!this.hasFile(path)) {
          return console.log('No file to clean up!');
        }
        execSync(`mv ${path}/* ${this.trashPath}`);
        console.log('Cleanup completed!');
      });
  }

  public add(path: string) {
    this.db.instance
      .get('targetPaths')
      .push(path)
      .write();
    console.log(`${path} added!`);
  }

  private init(path: string) {
    execSync(`mkdir ${this.trashPath(path)}`);
    console.log('Initialization completed');
  }
}
