import mongoose, { Schema, Document } from "mongoose";

interface AdminI {
    message: string;
    vacations: string[];
    workingDays: string[];
    minutesPerLine: number;
    username: string;
    name: string;
    password: string;
    token: string;

}

export interface AdminModel extends AdminI, Document<string> { }

const AdminSchema = new Schema({
    message: {
        type: String,
        required: [true, "Missing message"],
        minlength: 2,
        maxlength: 200
    },
    vacations: {
        type: Array,
        required: [true, "Missing vacations"]
    },
    workingDays: {
        type: Array,
        required: [true, "Missing workingDays"]
    },
    minutesPerLine: {
        type: Number,
        required: [true, "Missing minutesPerLine"],
        min: 15,
        max: 50
    },
    username: {
        type: String,
        minlength: [6, "Min 5 characters"],
        maxlength: [500, "Max 50 characters"],
        required: [true, "Missing username"]
    },
    phone: {
        type: String,
        required: [true, "Missing phone"],
        minlength: [9, "Min 9 characters"],
        maxlength: [13, "Max 13 characters"],
    },
    name: {
        type: String,
        minlength: [6, "Min 5 characters"],
        maxlength: [500, "Max 50 characters"],
    },
    password: {
        type: String,
        minlength: [6, "Min 6 characters"],
        maxlength: [500, "Max 500 characters"],
        required: [true, "Missing password"]
    },
    token: {
        type: String
    }

},
    {
        versionKey: false,
        id: false
    }
);




export default mongoose.model<AdminModel>("Admin", AdminSchema);
