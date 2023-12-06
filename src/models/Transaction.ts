import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction {
    err: any;
    status: string;
    data: {
        'data[asmachta]': string;
        'data[cardSuffix]': string;
        'data[cardType]': string;
        'data[cardTypeCode]': string;
        'data[cardBrand]': string;
        'data[cardBrandCode]': string;
        'data[cardExp]': string;
        'data[firstPaymentSum]': string;
        'data[periodicalPaymentSum]': string;
        'data[statusCode]': string;
        'data[transactionTypeId]': string;
        'data[paymentType]': string;
        'data[sum]': string;
        'data[paymentsNum]': string;
        'data[paymentDate]': string;
        'data[description]': string;
        'data[fullName]': string;
        'data[payerPhone]': string;
        'data[allPaymentsNum]': string;
        'data[payerEmail]': string;
        'data[transactionId]': string;
        'data[transactionToken]': string;
        'data[processId]': string;
        'data[processToken]': string;
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

