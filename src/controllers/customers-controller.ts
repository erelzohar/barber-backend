import express from "express";
import logic from "../logic/customers-logic";
import getError from "../helpers/errors-helper";
import Customer from "../models/Customer";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const customers = await logic.getAllCustomersAsync();
        res.json(customers);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.post("/", async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        const response = await logic.addCustomerAsync(newCustomer);
        res.json(response);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.delete("/:customerId", async (req, res) => {
    try {
        const _id = req.params.customerId;
        const deleted = await logic.deleteCustomerAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;