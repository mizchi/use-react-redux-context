var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "assert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert_1 = __importDefault(require("assert"));
    test("sample", function () {
        assert_1.default(1 === 1);
    });
});
// === Test example
//
// beforeEach(() => {
//   document.body.innerHTML = `<div class="root"></div>`;
// });
// test("Run app", () => {
//   require("../main");
//   assert(document.body.textContent === "Hello, {app_name}");
// });
