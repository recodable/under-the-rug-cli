"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
function Command(options) {
    if (options === void 0) { options = ''; }
    return function (target, propertyKey, descriptor) {
        // descriptor.enumerable = value;
        Reflect.defineMetadata(constants_1.SIGNATURE, options, descriptor.value);
    };
}
exports.Command = Command;
