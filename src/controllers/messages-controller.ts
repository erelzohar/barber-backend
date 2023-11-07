import express from "express";
import verifyAdmin from "../middleware/verifyAdmin";
import logic from "../logic/messages-logic";
import getError from "../helpers/errors-helper";
import Message from "../models/Message";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const messages = await logic.getAllMessagesAsync();
        res.json(messages);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.post("/",verifyAdmin, async (req, res) => {
    try {
        const messageToUpdate = new Message(req.body);
        const response = await logic.updateMessageAsync(messageToUpdate);
        res.json(response);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;