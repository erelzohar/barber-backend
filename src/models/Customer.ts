import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer {
    fullName:string;
    phone:string;
}

export interface CustomerModel extends ICustomer, Document<string> { }

const CustomerScheme: Schema = new Schema({

    fullName: {
        type: String,
        required: [true, "Missing Name"],
        minlength: [2, "Min 2 characters"],
        maxlength: [40, "Max 40 characters"],
    },
    phone: {
        type: String,
        required: [true, "Missing phone"],
        minlength: [9, "Min 9 characters"],
        maxlength: [13, "Max 13 characters"],
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


export default mongoose.model<CustomerModel>("Customer", CustomerScheme);

