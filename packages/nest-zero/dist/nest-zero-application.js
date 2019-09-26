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
const commander = require("commander");
const core_1 = require("@nestjs/core");
const routes_resolver_1 = require("./routes-resolver");
class NestZeroApplication extends core_1.NestApplicationContext {
    constructor(container, config, options) {
        super(container);
        this.config = config;
        this.instance = commander;
        this.routesResolver = new routes_resolver_1.RoutesResolver(this.container, this.config, this.injector);
    }
    execute(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialize();
            this.instance.parse(args);
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.routesResolver.resolve(this);
        });
    }
    addCommand(route, controllerName) {
        const controller = this.get(controllerName);
        const signature = [route.prefix, route.routePath].filter(v => v).join(':');
        (signature ? this.instance.command(signature) : this.instance).action(controller[route.methodName].bind(controller));
        return this;
    }
}
exports.NestZeroApplication = NestZeroApplication;
//# sourceMappingURL=nest-zero-application.js.map