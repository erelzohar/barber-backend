import mongoose, { Schema, Document } from "mongoose";

interface ProductI {
    name: string;
    price: number;
    category: Schema.Types.ObjectId;
    imageName: string;
    colors: string[];
    description: string;
    scentCategory:Schema.Types.ObjectId;
    level:number;
    scents:string[];
    isRecommended:boolean;
}

export interface ProductModel extends ProductI, Document<string> { }

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: 2,
        maxlength: 100
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: 0,
        max: 10000
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Missing category"]
    },
    imageName: {
        type: String,
        required: [true, "Missing imageName"]
    },
    colors: {
        type: Array
    },
    level: {
        type: Number
    },
    scentCategory: {
        type: Schema.Types.ObjectId,
        ref: "ScentCategory"
    },
    description: {
        type: String
    },
    scents:{
        type:Array,
    }

}, { versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true }, id: false });


export default mongoose.model<ProductModel>("Product", ProductSchema, "products");
