import { PaymentGatewayFactory } from "../../abstract/PaymentGatewayFactory.js";
import { StripeProcessor } from "./StripeProcessor.js";
import { StripeValidator } from "./StripeValidation.js";
export class StripeFactory extends PaymentGatewayFactory {
    createPaymentProcessor() {
        return new StripeProcessor();
    }
    createPaymentValidator() {
        return new StripeValidator();
    }
}
