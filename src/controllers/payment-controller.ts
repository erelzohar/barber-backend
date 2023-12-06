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

        //const data = JSON.parse(req.body);
        console.log(req.body['data[asmachta]']);
        //console.log(data['data[asmachta]']);
        console.log(req.body);
        
        const transaction = new Transaction(req.body);
        if (transaction.status === '0') return res.sendStatus(200)
        const order = req.body['data[customFields][cField1]'] ? JSON.parse(req.body['data[customFields][cField1]']) : null;


        // transaction.data.orderId = req.body['data[cField1]'];
        console.log(transaction);
        console.log(order);
        console.log(req.body['data[customFields][cField1]']);

        res.sendStatus(200)
    }
    catch (err) {
        console.log(err);

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