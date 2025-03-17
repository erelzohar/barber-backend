import mongoose, { Schema, Document } from "mongoose";

interface AdminI {
    message: {
        value: string;
        disabled: boolean;
    };
    socials: {
        instagram: string;
        tiktok: string;
        facebook: string;
    },
    address: {
        state: string;
        city: string;
        street: string;
        floor: string;
        aptNum: string;
    },
    vacations: string[];
    workingDays: string[];
    imagesNames: string[];
    minutesPerLine: number;
    minCancelTimeMS: number;
    historySaveTimeMS: number;
    incomePerLine: number;
    username: string;
    name: string;
    password: string;
    token: string;
    businessName: string;
    descriptions: string[];
    logoImgName: string;

}

export interface AdminModel extends AdminI, Document<string> { }

const AdminSchema = new Schema({
    message: {
        value: {
            type: String,
            required: [true, "Missing message value"]
        },
        disabled: {
            type: Boolean,
            required: [true, "Missing message disabled"]
        }
    },
    socials: {
        instagram: {
            type: String
        },
        tiktok: {
            type: String
        },
        facebook: {
            type: String
        }
    },
    address: {
        state: {
            type: String
        },
        city: {
            type: String
        },
        street: {
            type: String
        },
        floor: {
            type: String
        },
        aptNum: {
            type: String
        }
    },
    vacations: {
        type: Array,
        required: [true, "Missing vacations"]
    },
    workingDays: {
        type: Array,
        required: [true, "Missing workingDays"]
    },
    imagesNames: {
        type: Array
    },
    minutesPerLine: {
        type: Number,
        required: [true, "Missing minutesPerLine"],
        min: 15,
        max: 50
    },
    minCancelTimeMS: {
        type: Number,
        required: [true, "Missing minCancelTimeMS"]
    },
    historySaveTimeMS: {
        type: Number,
        required: [true, "Missing historySaveTimeMS"]
    },
    incomePerLine: {
        type: Number,
        required: [true, "Missing incomePerLine"]
    },
    username: {
        type: String,
        minlength: [6, "Min 5 characters"],
        maxlength: [500, "Max 50 characters"],
        required: [true, "Missing username"]
    },
    password: {
        type: String,
        minlength: [6, "Min 6 characters"],
        maxlength: [500, "Max 500 characters"],
        required: [true, "Missing password"]
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
    logoImgName: {
        type: String
    },
    businessName: {
        type: String,
        minlength: [6, "Min 5 characters"],
        maxlength: [500, "Max 50 characters"],
    },
    descriptions: {
        type: Array
    },
    aboutMe: {
        type: String,
        minlength: [6, "Min 6 characters"],
        maxlength: [500, "Max 500 characters"]
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
