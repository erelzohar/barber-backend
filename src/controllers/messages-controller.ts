import express from "express";
import verifyAdmin from "../middleware/verifyAdmin";
import logic from "../logic/messages-logic";
import getError from "../helpers/errors-helper";
const router = express.Router();

router.get("/",verifyAdmin, async (req, res) => {
    try {
        const messages = await logic.getAllMessagesAsync();
        res.json(messages);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;