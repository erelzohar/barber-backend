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
const lines_logic_1 = __importDefault(require("../logic/lines-logic"));
const errors_helper_1 = __importDefault(require("../helpers/errors-helper"));
const Line_1 = __importDefault(require("../models/Line"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lines = yield lines_logic_1.default.getAllLinesAsync();
        res.json(lines);
    }
    catch (err) {
        res.status(500).json((0, errors_helper_1.default)(err));
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newLine = new Line_1.default(req.body);
        const response = yield lines_logic_1.default.addLineAsync(newLine);
        res.json(response);
    }
    catch (err) {
        res.status(500).json((0, errors_helper_1.default)(err));
    }
}));
router.delete("/:lineId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.lineId;
        const deleted = yield lines_logic_1.default.deleteLineAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json((0, errors_helper_1.default)(err));
    }
}));
exports.default = router;
//# sourceMappingURL=lines-controller.js.map