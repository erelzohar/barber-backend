import express from "express";
import verifyAdmin from "../middleware/verifyAdmin";
import logic from "../logic/orders-logic";
import getError from "../helpers/errors-helper";
import Order from "../models/Order";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const orders = await logic.getAllOrdersAsync();
        res.json(orders);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.post("/", verifyAdmin, async (req, res) => {
    try {
        const orderToUpdate = new Order(req.body);
        orderToUpdate.items = JSON.parse(req.body.items);
        const response = await logic.updateOrderAsync(orderToUpdate);
        res.json(response);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.delete("/:orderId", verifyAdmin, async (req, res) => {
    try {
        const _id = req.params.orderId;
        const deleted = await logic.deleteOrderAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
export default router;