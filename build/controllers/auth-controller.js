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
const express_1 = __importDefault(require("express"));
const auth_logic_1 = __importDefault(require("../logic/auth-logic"));
const errors_helper_1 = __importDefault(require("../helpers/errors-helper"));
const Customer_1 = __importDefault(require("../models/Customer"));
const router = express_1.default.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new Customer_1.default(req.body);
        const addedUser = yield auth_logic_1.default.registerAsync(user);
        if (typeof addedUser !== "object")
            return res.status(400).send(addedUser);
        res.status(201).json(addedUser);
    }
    catch (err) {
        res.status(500).send((0, errors_helper_1.default)(err));
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedInUser = yield auth_logic_1.default.loginAsync(req.body);
        if (!loggedInUser)
            return res.status(401).send("Incorrect email or password.");
        res.json(loggedInUser);
    }
    catch (err) {
        res.status(500).send((0, errors_helper_1.default)(err));
    }
}));
exports.default = router;
//# sourceMappingURL=auth-controller.js.map