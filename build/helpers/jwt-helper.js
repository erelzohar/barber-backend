"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getNewToken(payload) {
    return jsonwebtoken_1.default.sign({ payload }, config_1.config.server.jwtKey, { expiresIn: "3h" });
}
exports.default = getNewToken;
//# sourceMappingURL=jwt-helper.js.map