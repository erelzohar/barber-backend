import mongoose, { Schema, Document } from "mongoose";

interface MessageI {
    type: string;
    message:string;
}

export interface MessageModel extends MessageI, Document<string> { }

const MessageSchema = new Schema({
    type: {
        type: String,
        required: [true, "Missing type"],
        minlength: 2,
        maxlength: 50
    },
    message: {
        type: String,
        required: [true, "Missing message"],
        minlength: 2,
        maxlength: 200
    }

},
    {
        versionKey: false,
        id: false
    }
);




export default mongoose.model<MessageModel>("Message", MessageSchema, "messages");
