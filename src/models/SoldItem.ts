import mongoose from "mongoose";

export class SoldItem{
    public productId:  mongoose.Types.ObjectId;
    public quantity: number;
    public color?: string = null;
    public scent?: string = null;
    public ml?: "200" | "500" | "1000" = null;
}