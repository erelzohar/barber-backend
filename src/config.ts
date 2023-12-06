import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.lytkt.mongodb.net/Don-Aroma${process.env.NODE_ENV !== "production" ? "-test" : ""}`
const JWT_KEY = process.env.JWT_KEY || "";
const S3_BUCKET = process.env.S3_BUCKET || "";
const BUCKET_REGION = process.env.BUCKET_REGION || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ""
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || ""
const PORT = process.env.PORT || 3001;
const MESHULAM_USER_ID = process.env.MESHULAM_USER_ID || "";
const CREDIT_PAGECODE = process.env.CREDIT_PAGECODE || "";
const BIT_PAGECODE = process.env.BIT_PAGECODE || "";
const APPLEPAY_PAGECODE = process.env.APPLEPAY_PAGECODE || "";
const GOOGLEPAY_PAGECODE = process.env.GOOGLEPAY_PAGECODE || "";


export const config = {
    mongo: {
        url: MONGO_URL
    },
    meshulam:{
        UserId: MESHULAM_USER_ID,
        pageCodes:{
            bit:BIT_PAGECODE,
            applePay:APPLEPAY_PAGECODE,
            credit:CREDIT_PAGECODE,
            googlePay:GOOGLEPAY_PAGECODE
        }
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
    }
}