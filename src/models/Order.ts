import mongoose, { Document, Schema } from "mongoose";

export interface IOrder {
    transactionId: string;
    deliveryType: string;
    city: string;
    street: string;
    streetNum: string;
    aptNum: string;
    fullName: string;
    phone: string;
    email: string;
    orderDate: string;
    done: boolean;
}

export interface OrderModel extends IOrder, Document<string> { }

const OrderScheme: Schema = new Schema({

    transactionId: {
        type: String
    },
    deliveryType: {
        type: String
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    streetNum: {
        type: String
    },
    aptNum: {
        type: String
    },
    fullName: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    orderDate: {
        type: String
    },
    done: {
        type: Boolean
    },
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


export default mongoose.model<OrderModel>("Order", OrderScheme, 'orders');

