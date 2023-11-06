import mongoose, { Document, Schema } from "mongoose";
// import mongooseUniqueValidator from "mongoose-unique-validator";
// import isEmail from "validator";

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
        required: [true, "Missing username"],
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Missing username"],
        minlength: [2, "Min 2 characters"],
        maxlength: [30, "Max 30 characters"],
    },
    phone: {
        type: String,
        required: [true, "Missing username"],
        minlength: [9, "Min 9 characters"],
        maxlength: [13, "Max 13 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        //validator: [isEmail, "Please enter a valid email."]
        // validate: {
        //     validator: isEmail,
        //     message: "Please enter a valid email."
        // }
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

//CustomerScheme.plugin(mongooseUniqueValidator);

export default mongoose.model<CustomerModel>("Customer", CustomerScheme);



// const CustomerSchema:Schema = new Schema({
//     customerId: {
//         type:String,
//         unique: true,
//         min: [100000, "Min 6 numbers."],
//         max: [1000000000, "Max 10 numbers"],
//         required: [true, "Missing id"]
//     },
//     firstName: {
//         type: String,
//         minlength: [2, "Min 2 characters"],
//         maxlength: [30, "Max 30 characters"],
//         required: [true, "Missing first name"]
//     },
//     lastName: {
//         type: String,
//         minlength: [2, "Min 2 characters"],
//         maxlength: [30, "Max 30 characters"],
//         required: [true, "Missing last name"]
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: [true, "Please enter an email"],
//         lowercase: true,
//         validate: [isEmail, "Please enter a valid email."],
//     },
//     password: {
//         type: String,
//         minlength: [6, "Min 6 characters"],
//         maxlength: [500, "Max 500 characters"],
//         required: [true, "Please enter a password"]
//     },
//     city: {
//         type: String,
//         minlength: [2, "Min 2 characters"],
//         maxlength: [30, "Max 30 characters"],
//         required: [true, "Please enter a city"]
//     },
//     street: {
//         type: String,
//         minlength: [2, "Min 2 characters"],
//         maxlength: [30, "Max 30 characters"],
//         required: [true, "Please enter a street"]
//     },
//     isAdmin: {
//         type: Boolean,
//         required: false,
//     },
//     token: {
//         type: String,
//         required: false
//     }
// }, { versionKey: false, toJSON: { virtuals: true }, id: false });

// CustomerSchema.plugin(mongooseUniqueValidator);

// const CustomerModel = mongoose.model("CustomerModel", CustomerSchema, "customers");

// module.exports = CustomerModel;