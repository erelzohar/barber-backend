import axios from 'axios';
import PaymentFormRequest from '../models/PaymentFormRequest';
import FormData from 'form-data';
import { config } from "../config";
import { TransactionModel } from '../models/Transaction';
import { OrderModel } from '../models/Order';
import Product from '../models/Product';


async function approveTransactionAsync(transaction: TransactionModel, pageCode: string) {
    const formData = new FormData();
    formData.append("pageCode", pageCode);
    formData.append("asmachta", transaction.asmachta);
    formData.append("cardSuffix", transaction.cardSuffix);
    formData.append("cardType", transaction.cardType);
    formData.append("cardTypeCode", transaction.cardTypeCode);
    formData.append("cardBrand", transaction.cardBrand);
    formData.append("cardBrandCode", transaction.cardBrandCode);
    formData.append("cardExp", transaction.cardExp);
    formData.append("firstPaymentSum", transaction.firstPaymentSum);
    formData.append("periodicalPaymentSum", transaction.periodicalPaymentSum);
    formData.append("status", transaction.status);
    formData.append("statusCode", transaction.statusCode);
    formData.append("transactionTypeId", transaction.transactionTypeId);
    formData.append("paymentType", transaction.paymentType);
    formData.append("sum", transaction.sum);
    formData.append("paymentsNum", transaction.paymentsNum);
    formData.append("allPaymentsNum", transaction.allPaymentsNum);
    formData.append("paymentDate", transaction.paymentDate);
    formData.append("description", transaction.description);
    formData.append("fullName", transaction.fullName);
    formData.append("payerPhone", transaction.payerPhone);
    formData.append("payerEmail", transaction.payerEmail);
    formData.append("transactionId", transaction.transactionId);
    formData.append("processId", transaction.processId);
    formData.append("processToken", transaction.processToken);
    formData.append("transactionToken", transaction.transactionToken);

    const res = await axios({
        method: "post",
        url: "https://sandbox.meshulam.co.il/api/light/server/1.0/approveTransaction/",
        data: formData
    })

    return res.data;
}


async function getPaymentFormAsync(data: PaymentFormRequest) {
    const formData = new FormData();
    console.log(data.orderJSON);
    
    formData.append("cField1", data.orderJSON);
    formData.append("cField2", config.meshulam.pageCodes[(data.pageCode as "bit" || "applePay" || "googlePay" || "credit")]);
    formData.append("description", data.description);
    formData.append("userId", config.meshulam.UserId);
    formData.append("maxPaymentNum", data.maxPaymentNum);
    formData.append("cancelUrl", data.cancelUrl);
    formData.append("successUrl", data.successUrl);
    formData.append("pageCode", config.meshulam.pageCodes[(data.pageCode as "bit" || "applePay" || "googlePay" || "credit")]);
    formData.append("pageField[fullName]", data.fullName);
    formData.append("pageField[phone]", data.phone);
    formData.append("pageField[email]", data.email);

    const order = JSON.parse(data.orderJSON);
    const sum = await calcOrderAsync(order);

    formData.append("sum", sum);

    const res = await axios({
        method: "post",
        url: "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess/",
        data: formData
    });

    if (res.data?.data.url) return res.data.data.url;
    return res.data;
}


async function calcOrderAsync(order: OrderModel) {
    let sum = 0;
    await Promise.all(order.items.map(async (i) => {
        const product = await Product.findById(i.product._id);
        let price = product.price * i.quantity;
        sum += price;
    }));
    if (order.deliveryType === "express") sum += 50;
    else if (order.deliveryType === "regular" && sum < 200) sum += 35;
    return sum;
}

export default {
    getPaymentFormAsync,
    approveTransactionAsync
}