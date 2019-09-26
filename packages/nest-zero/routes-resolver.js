"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
var constants_1 = require("./constants");
var shared_utils_1 = require("@nestjs/common/utils/shared.utils");
var RoutesResolver = /** @class */ (function () {
    function RoutesResolver(container, config, injector) {
        this.container = container;
        this.config = config;
        this.injector = injector;
        // this.routerExceptionsFilter = new RouterExceptionFilters(
        //   container,
        //   config,
        //   container.getHttpAdapterRef(),
        // );
        this.metadataScanner = new metadata_scanner_1.MetadataScanner();
        // this.routerBuilder = new RouterExplorer(
        //   metadataScanner,
        //   this.container,
        //   this.injector,
        //   this.routerProxy,
        //   this.routerExceptionsFilter,
        //   this.config,
        // );
        // this.routerBuilder = new RouterExplorer(
        //   metadataScanner,
        //   this.container,
        //   this.injector,
        //   this.routerProxy,
        //   this.routerExceptionsFilter,
        //   this.config,
        // );
    }
    RoutesResolver.prototype.resolve = function (app) {
        var _this = this;
        var modules = this.container.getModules();
        modules.forEach(function (_a, moduleName) {
            var controllers = _a.controllers, metatype = _a.metatype;
            // let path = metatype
            //   ? Reflect.getMetadata(MODULE_PATH, metatype)
            //   : undefined;
            // path = path ? basePath + path : basePath;
            _this.registerRouters(controllers, moduleName, app);
        });
    };
    RoutesResolver.prototype.registerRouters = function (routes, moduleName, app) {
        var _this = this;
        routes.forEach(function (instanceWrapper) {
            var instance = instanceWrapper.instance, metatype = instanceWrapper.metatype;
            var prefix = Reflect.getMetadata(constants_1.SIGNATURE, metatype);
            _this.scanForPaths(instance).forEach(function (route) {
                var controllerName = metatype.name;
                app.addCommand(__assign({}, route, { prefix: prefix }), controllerName);
            });
        });
        // routes.forEach(instanceWrapper => {
        //   const { metatype } = instanceWrapper;
        //   let signature = Reflect.getMetadata(SIGNATURE, metatype);
        //   // const path = this.routerBuilder.extractRouterPath(
        //   //   metatype as Type<any>,
        //   //   basePath,
        //   // );
        //   const controllerName = metatype.name;
        //   // console.log({ signature, controllerName });
        //   // app.command(signature).action(k)
        //   app.addCommand(signature, controllerName);
        //   // this.logger.log(CONTROLLER_MAPPING_MESSAGE(controllerName, path));
        //   // this.routerBuilder.explore(
        //   //   instanceWrapper,
        //   //   moduleName,
        //   //   applicationRef,
        //   //   path,
        //   // );
        // });
    };
    RoutesResolver.prototype.scanForPaths = function (instance, prototype) {
        var _this = this;
        var instancePrototype = shared_utils_1.isUndefined(prototype)
            ? Object.getPrototypeOf(instance)
            : prototype;
        return this.metadataScanner.scanFromPrototype(instance, instancePrototype, function (method) { return _this.exploreMethodMetadata(instance, instancePrototype, method); });
    };
    RoutesResolver.prototype.exploreMethodMetadata = function (instance, instancePrototype, methodName) {
        var targetCallback = instancePrototype[methodName];
        var routePath = Reflect.getMetadata(constants_1.SIGNATURE, targetCallback);
        if (shared_utils_1.isUndefined(routePath)) {
            return null;
        }
        // const requestMethod: RequestMethod = Reflect.getMetadata(
        //   METHOD_METADATA,
        //   targetCallback,
        // );
        // const path = isString(routePath)
        //   ? [this.validateRoutePath(routePath)]
        //   : routePath.map(p => this.validateRoutePath(p));
        return {
            routePath: routePath,
            targetCallback: targetCallback,
            methodName: methodName
        };
    };
    return RoutesResolver;
}());
exports.RoutesResolver = RoutesResolver;
