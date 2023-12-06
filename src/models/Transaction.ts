import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction {
    asmachta:string;
    cardSuffix: string;
    cardType: string;
    cardTypeCode: string;
    cardBrand: string;
    cardBrandCode: string;
    cardExp: string;
    firstPaymentSum: string;
    periodicalPaymentSum: string;
    status: string;
    statusCode: string;
    transactionTypeId: string;
    paymentType: string;
    sum: string;
    paymentsNum: string;
    paymentDate: string;
    description: string;
    fullName: string;
    payerPhone: string;
    allPaymentsNum: string;
    payerEmail: string;
    transactionId: string;
    transactionToken: string;
    processId: string;
    processToken: string;
    orderId: string;
}

export interface TransactionModel extends ITransaction, Document<string> { }

const TransactionScheme: Schema = new Schema({

    asmachta: {
        type: String
    },
    cardSuffix: {
        type: String
    },
    cardType: {
        type: String
    },
    cardTypeCode: {
        type: String
    },
    cardBrand: {
        type: String
    },
    cardBrandCode: {
        type: String
    },
    cardExp: {
        type: String
    },
    firstPaymentSum: {
        type: String
    },
    periodicalPaymentSum: {
        type: String
    },
    status: {
        type: String
    },
    statusCode: {
        type: String
    },
    transactionTypeId: {
        type: String
    },
    paymentType: {
        type: String
    },
    sum: {
        type: String
    },
    paymentsNum: {
        type: String
    },
    paymentDate: {
        type: String
    },
    description: {
        type: String
    },
    fullName: {
        type: String
    },
    payerPhone: {
        type: String
    },
    allPaymentsNum: {
        type: String
    },
    payerEmail: {
        type: String
    },
    transactionId: {
        type: String
    },
    transactionToken: {
        type: String
    },
    processId: {
        type: String
    },
    processToken: {
        type: String
    },
    orderId: {
        type: String
    },
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


export default mongoose.model<TransactionModel>("Transaction", TransactionScheme,'transactions');

