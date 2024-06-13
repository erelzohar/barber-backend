"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function hash(plainText) {
    if (!plainText)
        return null;
    const salt = "EZ";
    return crypto_1.default.createHmac("sha512", salt).update(plainText).digest("hex");
}
exports.default = hash;
//# sourceMappingURL=crypto-helper.js.map