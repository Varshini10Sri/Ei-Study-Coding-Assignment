import { PaymentProcessor } from "./PaymentProcessor.js";
import { PaymentValidator } from "./PaymentValidator.js";

export abstract class PaymentGatewayFactory {
  abstract createPaymentProcessor(): PaymentProcessor;
  abstract createPaymentValidator(): PaymentValidator;
}
