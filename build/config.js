"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.lytkt.mongodb.net/Ariel-Edri`;
const JWT_KEY = process.env.JWT_KEY || "";
const S3_BUCKET = process.env.S3_BUCKET || "";
const BUCKET_REGION = process.env.BUCKET_REGION || "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
const PORT = process.env.PORT || 3001;
exports.config = {
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
    }
};
//# sourceMappingURL=config.js.map