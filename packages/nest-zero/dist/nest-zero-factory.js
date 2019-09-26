"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nest_zero_application_1 = require("./nest-zero-application");
const core_1 = require("@nestjs/core");
const instance_loader_1 = require("@nestjs/core/injector/instance-loader");
const scanner_1 = require("@nestjs/core/scanner");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const exceptions_zone_1 = require("@nestjs/core/errors/exceptions-zone");
class NestZeroFactoryStatic {
    create(module, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = new core_1.ApplicationConfig();
            const container = new core_1.NestContainer();
            yield this.initialize(module, container, config);
            const instance = new nest_zero_application_1.NestZeroApplication(container, config, options);
            return instance;
        });
    }
    initialize(module, container, config = new core_1.ApplicationConfig()) {
        return __awaiter(this, void 0, void 0, function* () {
            const instanceLoader = new instance_loader_1.InstanceLoader(container);
            const dependenciesScanner = new scanner_1.DependenciesScanner(container, new metadata_scanner_1.MetadataScanner(), config);
            try {
                yield exceptions_zone_1.ExceptionsZone.asyncRun(() => __awaiter(this, void 0, void 0, function* () {
                    yield dependenciesScanner.scan(module);
                    yield instanceLoader.createInstancesOfDependencies();
                    dependenciesScanner.applyApplicationProviders();
                }));
            }
            catch (e) {
                process.abort();
            }
        });
    }
}
exports.NestZeroFactoryStatic = NestZeroFactoryStatic;
exports.NestZeroFactory = new NestZeroFactoryStatic();
//# sourceMappingURL=nest-zero-factory.js.map