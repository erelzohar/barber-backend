import crypto from "crypto";

export default function hash(plainText:string) {

    if(!plainText) return null;

    const salt = "EZ";
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}
