import { PaymentGatewayFactory } from "../../abstract/PaymentGatewayFactory.js";
import { PayPalProcessor } from "./PayPalProcessor.js";
import { PayPalValidator } from "./PayPalValidator.js";

export class PayPalFactory extends PaymentGatewayFactory {
  createPaymentProcessor() {
    return new PayPalProcessor();
  }

  createPaymentValidator() {
    return new PayPalValidator();
  }
}
