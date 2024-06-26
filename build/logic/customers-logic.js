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
const Customer_1 = __importDefault(require("../models/Customer"));
function getAllCustomersAsync() {
    return Customer_1.default.find().exec();
}
function deleteCustomerAsync(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Customer_1.default.deleteOne({ _id }).exec();
    });
}
function addCustomerAsync(customer) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = customer.validateSync();
        if (errors)
            throw errors;
        return yield customer.save();
    });
}
exports.default = {
    getAllCustomersAsync,
    deleteCustomerAsync,
    addCustomerAsync
};
//# sourceMappingURL=customers-logic.js.map