"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const constants_1 = require("./constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
class RoutesResolver {
    constructor(container, config, injector) {
        this.container = container;
        this.config = config;
        this.injector = injector;
        this.metadataScanner = new metadata_scanner_1.MetadataScanner();
    }
    resolve(app) {
        const modules = this.container.getModules();
        modules.forEach(({ controllers, metatype }, moduleName) => {
            this.registerRouters(controllers, moduleName, app);
        });
    }
    registerRouters(routes, moduleName, app) {
        routes.forEach(instanceWrapper => {
            const { instance, metatype } = instanceWrapper;
            const prefix = Reflect.getMetadata(constants_1.SIGNATURE, metatype);
            this.scanForPaths(instance).forEach(route => {
                const controllerName = metatype.name;
                app.addCommand(Object.assign({}, route, { prefix }), controllerName);
            });
        });
    }
    scanForPaths(instance, prototype) {
        const instancePrototype = shared_utils_1.isUndefined(prototype)
            ? Object.getPrototypeOf(instance)
            : prototype;
        return this.metadataScanner.scanFromPrototype(instance, instancePrototype, method => this.exploreMethodMetadata(instance, instancePrototype, method));
    }
    exploreMethodMetadata(instance, instancePrototype, methodName) {
        const targetCallback = instancePrototype[methodName];
        const routePath = Reflect.getMetadata(constants_1.SIGNATURE, targetCallback);
        if (shared_utils_1.isUndefined(routePath)) {
            return null;
        }
        return {
            routePath,
            targetCallback,
            methodName,
        };
    }
}
exports.RoutesResolver = RoutesResolver;
//# sourceMappingURL=routes-resolver.js.map