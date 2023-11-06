import fs from "fs";

export default function safeDelete(absolutePath:string) {
    try {
        if(!absolutePath || !fs.existsSync(absolutePath)) return;
        fs.unlinkSync(absolutePath);
    }
    catch(err) {
        console.log(err);
    }
}

