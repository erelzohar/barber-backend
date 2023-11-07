import mongoose, { Schema, Document } from "mongoose";

interface CategoryI {
    name: string;
    imageName:string;
}

export interface CategoryModel extends CategoryI, Document<string> { }

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: 2,
        maxlength: 50
    },
    imageName: {
        type: String,
        required: [true, "Missing imageName"],
        minlength: 2,
        maxlength: 200
    }

},
    {
        versionKey: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        id: false
    }
);


CategorySchema.virtual("products", {
    ref: "Product", 
    localField: "_id", 
    foreignField: "category" 
});

export default mongoose.model<CategoryModel>("Category", CategorySchema, "categories");
