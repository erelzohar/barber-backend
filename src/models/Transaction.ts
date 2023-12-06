import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction {
    status: string;
    data: {
        asmachta: string;
        cardSuffix: string;
        cardType: string;
        cardTypeCode: string;
        cardBrand: string;
        cardBrandCode: string;
        cardExp: string;
        firstPaymentSum: string;
        periodicalPaymentSum: string;
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

}

export interface TransactionModel extends ITransaction, Document<string> { }

const TransactionScheme: Schema = new Schema({

    data: {
        type: Object
    },
    status: {
        type: String
    },

}, { versionKey: false, toJSON: { virtuals: true }, id: false });


export default mongoose.model<TransactionModel>("Transaction", TransactionScheme, 'transactions');

