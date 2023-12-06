import axios from 'axios';
import PaymentFormRequest from 'models/PaymentFormRequest';
import FormData from 'form-data';
import { config } from "../config";

async function getPaymentFormAsync(data: PaymentFormRequest) {
    const formData = new FormData();    
    formData.append("cField1", data.orderJSON);
    formData.append("description", data.description);
    formData.append("userId", config.meshulam.UserId);
    formData.append("maxPaymentNum", data.maxPaymentNum);
    formData.append("cancelUrl", data.cancelUrl);
    formData.append("successUrl", data.successUrl);
    formData.append("pageCode", config.meshulam.pageCodes[(data.pageCode as "bit" || "applePay" || "googlePay" || "credit")]);
    formData.append("pageField[fullName]", data.fullName);
    formData.append("pageField[phone]", data.phone);
    formData.append("pageField[email]", data.email);
    formData.append("sum", data.sum);

    const res = await axios({
        method: "post",
        url: "https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess/",
        data: formData
    })

    if (res.data?.data.url) return res.data.data.url;
    return res.data;
}



export default {
    getPaymentFormAsync
}