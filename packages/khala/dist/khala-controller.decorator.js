"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function Controller(options = '') {
    const signature = typeof options === 'string' ? options : options.signature;
    return (target) => {
        Reflect.defineMetadata(constants_1.SIGNATURE, signature, target);
    };
}
exports.Controller = Controller;
//# sourceMappingURL=khala-controller.decorator.js.map