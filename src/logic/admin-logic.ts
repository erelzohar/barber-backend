import Admin, { AdminModel } from "../models/Admin"
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { config } from "../config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    credentials: {
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.secret
    },
    region: config.aws.region
});

async function getAdminDetailsAsync() {
    return Admin.findOne().exec();
}

async function updateAdminAsync(admin: AdminModel) {
    return Admin.findByIdAndUpdate(admin._id, { ...admin },{ new: true, runValidators: true });
}
async function getImageAsync(imageName: string) {
    const getObjectParams = {
        Bucket: config.aws.bucketName,
        Key: imageName
    }    
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 1800 });
    return url;
}
export default {
    getAdminDetailsAsync,
    updateAdminAsync,
    getImageAsync
}