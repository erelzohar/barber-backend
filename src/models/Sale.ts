import mongoose, { Document, Schema } from "mongoose";

export interface ISale {
    name:string;
    type: string;
    date: string;
    saleData: string;
}

export interface SaleModel extends ISale, Document<string> { }

const SaleScheme: Schema = new Schema({

    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
    },
    type: {
        enum: ["quantity", "plus", 'percent'],
        type: String,
        required: [true, "Missing type"],
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
    },
    date: {
        type: String
    },
    saleData: {
        type: String,
        required: [true, "Missing saleData"],
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


export default mongoose.model<SaleModel>("Sale", SaleScheme,'sales');

