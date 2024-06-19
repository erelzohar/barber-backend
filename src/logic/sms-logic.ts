import { SMS } from "../models/SMS";
import { config } from "../config";
import * as Twilio from 'twilio';


async function sendSmsAsync(sms: SMS) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = Twilio.default(accountSid, authToken)
    client.messages
        .create({
            body: sms.message,
            from: 'ZIMUN-TORIM',
            to: sms.phoneNumber
        })
        .then(message => message.status);
}

export default {
    sendSmsAsync
}