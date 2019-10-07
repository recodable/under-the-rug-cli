"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function Command(options = '') {
    return function (target, propertyKey, descriptor) {
        if (typeof options === "string") {
            options = { signature: options };
        }
        Reflect.defineMetadata(constants_1.SIGNATURE, options.signature, descriptor.value);
        Reflect.defineMetadata(constants_1.DESCRIPTION, options.description, descriptor.value);
    };
}
exports.Command = Command;
//# sourceMappingURL=khala-command.decorator.js.map