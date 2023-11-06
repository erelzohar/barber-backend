import mongoose, { Schema, Document } from "mongoose";

interface ScentCategoryI {
    name: string;
}

export interface ScentCategoryModel extends ScentCategoryI, Document<string> { }

const ScentCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: 2,
        maxlength: 50
    }

},
    {
        versionKey: false,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        id: false
    }
);



export default mongoose.model<ScentCategoryModel>("ScentCategory", ScentCategorySchema, "scentsCategories");
