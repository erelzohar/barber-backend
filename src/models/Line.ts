import mongoose, { Document, Schema } from "mongoose";

export interface ILine {
    name:string;
    phone:string;
    timestamp:string;
    admin_id:mongoose.Types.ObjectId;
}

export interface LineModel extends ILine, Document<string> { }

const LineScheme: Schema = new Schema({

    name: {
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
    },
    admin_id: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: [true, "Missing admin_id"]
    },
    timestamp: {
        type: String,
        required: [true, "Missing timestamp"]
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });


export default mongoose.model<LineModel>("Line", LineScheme);

