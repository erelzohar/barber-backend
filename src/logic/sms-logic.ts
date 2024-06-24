import { SMS } from "../models/SMS";
import { config } from "../config";
import axios from "axios";


async function sendSmsAsync(sms: SMS) {
    console.log("enter");
    
    const user = config.smsService.user;
    const pass = config.smsService.pass;
    const key = config.smsService.key;
    const sender = config.smsService.sender;
    console.log(JSON.stringify({
        user,
        key,
        pass,
        sender,
        recipient:sms.phoneNumber,
        msg:Buffer.from(sms.message,"base64").toString()
    }));
    
    axios.post("https://api.sms4free.co.il/ApiSMS/v2/SendSMS",JSON.stringify({
        user,
        key,
        pass,
        sender,
        recipient:sms.phoneNumber,
        msg:Buffer.from(sms.message,"base64").toString()
    }))
    .then(res=>res.data);
}

export default {
    sendSmsAsync
}