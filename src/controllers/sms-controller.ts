import express from "express";
import logic from "../logic/sms-logic";
import getError from "../helpers/errors-helper";


const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const response = await logic.sendSmsAsync(req.body);
        console.log(response);
        
        res.json(response);
    }
    catch (err) {
        console.log(err);
        
        res.status(500).json(getError(err as Error));
    }
});

export default router;