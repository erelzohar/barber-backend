import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../config";
import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";
import sharp from "sharp";

const s3 = new S3Client({
    credentials: {
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.secret
    },
    region: config.aws.region
});

async function getS3ImageAsync(imageName: string) {
    const getObjectParams = {
        Bucket: config.aws.bucketName,
        Key: imageName
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 1800 });
    return url;

}

async function addS3ImageAsync(img: UploadedFile): Promise<string> {

    const extension = '.webp';
    const imageName = new Date().getTime().toString() + randomUUID() + extension;
    const buffer = await sharp(img.data)
        .resize(700, 700, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .toFormat("webp")
        .webp({ quality: 60 })
        .toBuffer();
    const command = new PutObjectCommand({
        Bucket: config.aws.bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: img.mimetype
    });
    await s3.send(command);
    return imageName;
}

async function deleteS3ImageAsync(imgName: string) {
    const params = {
        Bucket: config.aws.bucketName,
        Key: imgName
    };
    const command = new DeleteObjectCommand(params);
    s3.send(command);

}

export default {
    getS3ImageAsync,
    addS3ImageAsync,
    deleteS3ImageAsync
}