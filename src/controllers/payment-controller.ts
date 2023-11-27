import getError from "../helpers/errors-helper";
import express from "express";

const router= express.Router()

router.post("/payment", async (req, res) => {
    try {
        console.log(req.body);
        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;