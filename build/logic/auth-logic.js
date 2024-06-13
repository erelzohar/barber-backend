"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_helper_1 = __importDefault(require("../helpers/jwt-helper"));
const crypto_helper_1 = __importDefault(require("../helpers/crypto-helper"));
const Admin_1 = __importDefault(require("models/Admin"));
function registerAsync(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            user.password = (0, crypto_helper_1.default)(user.password);
            const errors = user.validateSync();
            if (errors)
                return errors.message;
            yield user.save();
            user.token = (0, jwt_helper_1.default)(user);
            delete user.password;
            return user;
        }
        catch (err) {
            return "Email allready exits.";
        }
    });
}
function loginAsync(credentials) {
    return __awaiter(this, void 0, void 0, function* () {
        credentials.password = (0, crypto_helper_1.default)(credentials.password);
        const user = yield Admin_1.default.findOne({ "username": credentials.username, "password": credentials.password });
        if (!user)
            return null;
        if (user)
            user.token = (0, jwt_helper_1.default)(user);
        delete user.password;
        return user;
    });
}
exports.default = {
    registerAsync,
    loginAsync
};
//# sourceMappingURL=auth-logic.js.map