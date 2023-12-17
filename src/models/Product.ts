import mongoose, { Schema, Document } from "mongoose";

interface ProductI {
    name: string;
    price: number;
    category: Schema.Types.ObjectId;
    colors: string[];
    description: string;
    scentCategory: Schema.Types.ObjectId;
    level: number;
    scents: string[];
    isRecommended: boolean;
    images: string[];
    stock: number;
    sortIndex: number;
    sales: Schema.Types.ObjectId[];
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
    scents: {
        type: Array,
    },
    isRecommended: {
        type: Boolean
    },
    images: {
        type: Array
    },
    stock: {
        type: Number,
        required: [true, "missing stock units"],
        min: -1,
        max: 10000
    },
    sortIndex: {
        type: Number,
        min: 0,
        max: 10000
    },
    sales: [{
        type: Schema.Types.ObjectId,
        ref: "Sale"
    }]

}, { versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true }, id: false });

ProductSchema.virtual("mlPrices").get(function () {
    if (this.category.equals("650acfabc4c0c3b0a4da8ad3") && !this.scentCategory) return null;
    if (this.scentCategory) {
        if (this.scentCategory.equals('653a8633d3094d31d9c56e87')) {
            return {
                '200': 130,
                '500': 200,
                '1000': 350
            };
        }
        return {
            '200': 80,
            '500': 150,
            '1000': 265
        }
    }
})

ProductSchema.pre('save',function(next){
    this.name = this.name.replace('"',"").replace("'","");//fix later json problems    
    this.description = this.description.replace('"',"").replace("'","");   
    next();
})

export default mongoose.model<ProductModel>("Product", ProductSchema, "products");
