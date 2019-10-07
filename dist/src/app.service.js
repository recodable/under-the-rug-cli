"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const database_service_1 = require("./database/database.service");
let AppService = class AppService {
    constructor(db) {
        this.db = db;
        this.trashDir = '.tmp';
        this.desktopPath = `${process.env.HOME}/Desktop`;
    }
    trashPath(path) {
        return `${path}/${this.trashDir}`;
    }
    needInitialization(path) {
        return !fs_1.existsSync(this.trashPath(path));
    }
    hasFile(path) {
        return !!fs_1.readdirSync(path).filter(file => !file.match(/^\./)).length;
    }
    cleanup() {
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
            child_process_1.execSync(`mv ${path}/* ${this.trashPath(path)}`);
            console.log('Cleanup completed!');
        });
    }
    add(path) {
        const collection = this.db.instance.get('targetPaths');
        if (collection.value().includes(path)) {
            return console.log(`${path} already added!`);
        }
        collection
            .push(path)
            .write();
        console.log(`${path} added!`);
    }
    init(path) {
        child_process_1.execSync(`mkdir ${this.trashPath(path)}`);
        console.log('Initialization completed');
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map