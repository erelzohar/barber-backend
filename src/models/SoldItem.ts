import { ProductModel } from "./Product";

export class SoldItem{
    public product: ProductModel;
    public quantity: number;
    public color?: string = null;
    public scent?: string = null;
    public ml?: "200" | "500" | "1000" = null;
}