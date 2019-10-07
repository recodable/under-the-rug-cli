import { DatabaseService } from './database/database.service';
export declare class AppService {
    private readonly db;
    private readonly trashDir;
    private readonly desktopPath;
    constructor(db: DatabaseService);
    trashPath(path: string): string;
    needInitialization(path: string): boolean;
    hasFile(path: string): boolean;
    cleanup(): void;
    add(path: string): void;
    private init;
}
