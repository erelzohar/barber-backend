import axios from 'axios';
import PaymentFormRequest from '../models/PaymentFormRequest';
import FormData from 'form-data';
import { config } from "../config";
import { TransactionModel } from '../models/Transaction';


async function approveTransaction(transaction: TransactionModel, pageCode: string) {
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

    const res = await axios({
        method: "post",
        url: "https://sandbox.meshulam.co.il/api/light/server/1.0/approveTransaction/",
        data: formData
    })

    console.log(res.data);

    return res.data;
}


async function getPaymentFormAsync(data: PaymentFormRequest) {
    const formData = new FormData();
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
    formData.append("sum", data.sum);

    const res = await axios({
        method: "post",
        url: "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess/",
        data: formData
    })

    if (res.data?.data.url) return res.data.data.url;
    return res.data;
}



export default {
    getPaymentFormAsync,
    approveTransaction
}