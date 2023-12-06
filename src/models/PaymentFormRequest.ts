class PaymentFormRequest {
    constructor(request:PaymentFormRequest){
        this.sum = request.sum;
        this.successUrl = request.successUrl;
        this.description = request.description;
        this.cancelUrl = request.cancelUrl;
        this.pageCode = request.pageCode;
        this.orderJSON = request.orderJSON;
        this.fullName = request.fullName;
        this.phone = request.phone;
        this.email = request.email;
        this.maxPaymentNum = request.maxPaymentNum;
    }
    userId:string;
    sum: number;
    successUrl: string;
    description: string;
    cancelUrl: string;
    pageCode: string;
    orderJSON: string;
    fullName: string;
    phone: string;
    email: string;
    maxPaymentNum:number;
}

export default PaymentFormRequest;