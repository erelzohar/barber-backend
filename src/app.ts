import { config } from "./config";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import expressRateLimit from "express-rate-limit";
import expressFileUpload from "express-fileupload";
import productsController from "./controllers/products-controller";
import authController from "./controllers/auth-controller";
import messagesController from "./controllers/messages-controller";
import paymentController from './controllers/payment-controller';
import useCors from "./middleware/cors";
const app = express();

app.use(useCors);
app.use(express.json());
app.use(expressFileUpload());
app.use("/", expressRateLimit({
    windowMs: 5000,
    max: 100,
    message: "Are You a Hacker?"
}));


app.get("/ping", (req: Request, res: Response) => {
    res.json("PONG");
});

app.use("/api/products", productsController);
app.use("/api/auth", authController);
app.use("/api/message", messagesController);
app.use("/api/meshulam-test", paymentController);


mongoose.connect(config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
        console.log("connected to mongo");
        app.listen(config.server.port, () => {
            console.log(`listening to port ${config.server.port}`);
        })
    })
    .catch((err) => {
        console.log(err);
        throw new Error("mongo connection failed");
    })
