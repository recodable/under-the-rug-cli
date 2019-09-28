import { Injectable } from '@nestjs/common';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

@Injectable()
export class DatabaseService {
  private readonly adapter: FileSync;
  private readonly db;

  constructor(defaults: object = {}) {
    this.adapter = new FileSync('db.json');
    this.db = low(this.adapter);
    this.db.defaults(defaults).write();
  }

  get instance() {
    return this.db;
  }
}
