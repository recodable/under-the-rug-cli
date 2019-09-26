"use strict";
exports.__esModule = true;
var constants_1 = require("./constants");
function Controller(options) {
    if (options === void 0) { options = ''; }
    var signature = typeof options === 'string' ? options : options.signature;
    return function (target) {
        Reflect.defineMetadata(constants_1.SIGNATURE, signature, target);
    };
}
exports.Controller = Controller;
