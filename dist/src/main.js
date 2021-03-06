#!/usr/local/bin/node
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
const khala_1 = require("khala");
const app_module_1 = require("./app.module");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(process.env.NODE_ENV);
        const app = yield khala_1.KhalaFactory.create(app_module_1.AppModule, { logger: false });
        yield app.execute(process.argv);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
