import getError from "../helpers/errors-helper";
import express from "express";
import bodyParser from "body-parser";
import PaymentFormRequest from "../models/PaymentFormRequest";
import paymentsLogic from "../logic/payments-logic";
import Transaction from "../models/Transaction";
import ordersLogic from "../logic/orders-logic";
import Order from "../models/Order";
import mongoose from "mongoose";

const router = express.Router();
router.use(bodyParser.json());

router.use(bodyParser.json({ type: 'application/*+json' }));

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/payment", urlencodedParser, async (req, res) => {
    try {
        console.log("FIRST TIME");
        // console.log(req.originalUrl);
        // console.log(req.body);
        
        // const transaction = new Transaction(req.body);
        // if (transaction.status === '0') return res.sendStatus(200);        
        // transaction.asmachta = req.body['data[asmachta]'];
        // transaction.cardSuffix = req.body['data[cardSuffix]'];
        // transaction.cardType = req.body['data[cardType]'];
        // transaction.cardTypeCode = req.body['data[cardTypeCode]'];
        // transaction.cardBrand = req.body['data[cardBrand]'];
        // transaction.cardBrandCode = req.body['data[cardBrandCode]'];
        // transaction.cardExp = req.body['data[cardExp]'];
        // transaction.firstPaymentSum = req.body['data[firstPaymentSum]'];
        // transaction.periodicalPaymentSum = req.body['data[periodicalPaymentSum]'];
        // transaction.status = req.body['data[status]'];
        // transaction.statusCode = req.body['data[statusCode]'];
        // transaction.transactionTypeId = req.body['data[transactionTypeId]'];
        // transaction.paymentType = req.body['data[paymentType]'];
        // transaction.sum = req.body['data[sum]'];
        // transaction.paymentsNum = req.body['data[paymentsNum]'];
        // transaction.allPaymentsNum = req.body['data[allPaymentsNum]'];
        // transaction.paymentDate = req.body['data[paymentDate]'];
        // transaction.description = req.body['data[description]'];
        // transaction.fullName = req.body['data[fullName]'];
        // transaction.payerPhone = req.body['data[payerPhone]'];
        // transaction.payerEmail = req.body['data[payerEmail]'];
        // transaction.transactionId = req.body['data[transactionId]'];
        // transaction.processId = req.body['data[processId]'];
        // transaction.processToken = req.body['data[processToken]'];
        // const parsedOrder = req.body['data[customFields][cField1]'] ? JSON.parse(req.body['data[customFields][cField1]']) : null;
        // const order = new Order(parsedOrder);
        // order.transactionId = new mongoose.Types.ObjectId(transaction._id);
        // order.totalSum = +transaction.sum;
        // const addedOrder = await ordersLogic.createOrderAsync(order);
        // transaction.orderId = new mongoose.Types.ObjectId(addedOrder._id);
        // await transaction.save();
        
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.status(200).json(getError(err as Error));
    }
});
router.post("/get-payment-form", async (req, res) => {
    try {
        const formRequest = new PaymentFormRequest(req.body);
        const response = await paymentsLogic.getPaymentFormAsync(formRequest);
        console.log(response);
        
        res.send(response);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;