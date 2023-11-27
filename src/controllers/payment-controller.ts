import getError from "../helpers/errors-helper";
import express from "express";
import bodyParser from "body-parser";

const router= express.Router()
router.use(bodyParser.json());

router.use(bodyParser.json({ type: 'application/*+json' }))

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post("/payment",urlencodedParser, async (req, res) => {
    try {
        console.log(req.body);
        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;