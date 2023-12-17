import mongoose, { Document, Schema } from "mongoose";
import { SoldItem } from "./SoldItem";

export interface IOrder {
    transactionId: mongoose.Types.ObjectId;
    deliveryType: string;
    items:SoldItem[];
    city: string;
    street: string;
    streetNum: string;
    aptNum: string;
    fullName: string;
    phone: string;
    email: string;
    orderNumber: string;
    orderDate: string;
    totalSum:number;
    done: boolean;
}

export interface OrderModel extends IOrder, Document<string> { }

const OrderScheme: Schema = new Schema({

    transactionId: {
        type: Schema.Types.ObjectId
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
    totalSum: {
        type: Number
    },
    email: {
        type: String
    },
    orderDate: {
        type: String
    },
    orderNumber: {
        type: String
    },
    products: {
        type: Array
    },
    done: {
        type: Boolean
    },
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


export default mongoose.model<OrderModel>("Order", OrderScheme, 'orders');

