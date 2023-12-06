import getError from "../helpers/errors-helper";
import express from "express";
import bodyParser from "body-parser";
import PaymentFormRequest from "../models/PaymentFormRequest";
import paymentsLogic from "../logic/payments-logic";
import Transaction from "../models/Transaction";

const router = express.Router()
router.use(bodyParser.json());

router.use(bodyParser.json({ type: 'application/*+json' }))

var urlencodedParser = bodyParser.urlencoded({ extended: false })
router.post("/payment", urlencodedParser, async (req, res) => {
    try {

        const data = JSON.parse(req.body);
        console.log(data);
        //console.log(data['data[asmachta]']);

        //const transaction = new Transaction(req.body);
        // transaction.data.orderId = req.body.data.cField1
        //console.log(transaction);

        res.sendStatus(200)
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.post("/get-payment-form", async (req, res) => {
    try {
        const formRequest = new PaymentFormRequest(req.body);
        const response = await paymentsLogic.getPaymentFormAsync(formRequest);
        res.send(response);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;