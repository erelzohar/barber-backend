import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.lytkt.mongodb.net/Ariel-Edri${process.env.NODE_ENV !== "production" ? "-test" : ""}`
const JWT_KEY = process.env.JWT_KEY || "";
const S3_BUCKET = process.env.S3_BUCKET || "";
const BUCKET_REGION = process.env.BUCKET_REGION || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ""
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || ""
const PORT = process.env.PORT || 3001;
const SMS_USER = process.env.SMS_USER || "";
const SMS_KEY = process.env.SMS_KEY || "";
const SMS_PASS = process.env.SMS_PASS || "";
const SMS_SENDER = process.env.SMS_SENDER || "";

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT,
        jwtKey: JWT_KEY,
    },
    aws: {
        bucketName: S3_BUCKET,
        region: BUCKET_REGION,
        secret: AWS_SECRET_ACCESS_KEY,
        accessKey: AWS_ACCESS_KEY_ID
    },
    smsService:{
        user:SMS_USER,
        key:SMS_KEY,
        pass:SMS_PASS,
        sender:SMS_SENDER
    }
}