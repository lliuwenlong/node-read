"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thinkjs_1 = require("thinkjs");
class default_1 extends thinkjs_1.think.Logic {
    indexAction() {
    }
    addTypeAction() {
        this.allowMethods = 'post';
        const rules = {
            name: {
                string: true,
                required: true
            }
        };
        let flag = this.validate(rules);
    }
}
exports.default = default_1;
//# sourceMappingURL=type.js.map