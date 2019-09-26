"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function Command(options = '') {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(constants_1.SIGNATURE, options, descriptor.value);
    };
}
exports.Command = Command;
//# sourceMappingURL=nest-zero-command.decorator.js.map