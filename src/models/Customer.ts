import mongoose, { Document, Schema } from "mongoose";

export interface ICustomer {
    firstName:string;
    lastName:string;
    phone:string;
    email: string;
    password: string;
    isAdmin:boolean;
    token :string;
}

export interface CustomerModel extends ICustomer, Document<string> { }

const CustomerScheme: Schema = new Schema({

    firstName: {
        type: String,
        required: [true, "Missing firstName"],
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Missing lastName"],
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
    },
    phone: {
        type: String,
        required: [true, "Missing phone"],
        minlength: [9, "Min 9 characters"],
        maxlength: [13, "Max 13 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    password: {
        type: String,
        minlength: [6, "Min 6 characters"],
        maxlength: [500, "Max 500 characters"],
        required: [true, "Missing password"]
    },
    token:{
        type:String
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


export default mongoose.model<CustomerModel>("Customer", CustomerScheme);

