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
const customers_logic_1 = __importDefault(require("../logic/customers-logic"));
const errors_helper_1 = __importDefault(require("../helpers/errors-helper"));
const Customer_1 = __importDefault(require("../models/Customer"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customers_logic_1.default.getAllCustomersAsync();
        res.json(customers);
    }
    catch (err) {
        res.status(500).json((0, errors_helper_1.default)(err));
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCustomer = new Customer_1.default(req.body);
        const response = yield customers_logic_1.default.addCustomerAsync(newCustomer);
        res.json(response);
    }
    catch (err) {
        res.status(500).json((0, errors_helper_1.default)(err));
    }
}));
router.delete("/:customerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.customerId;
        const deleted = yield customers_logic_1.default.deleteCustomerAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json((0, errors_helper_1.default)(err));
    }
}));
exports.default = router;
//# sourceMappingURL=customers-controller.js.map