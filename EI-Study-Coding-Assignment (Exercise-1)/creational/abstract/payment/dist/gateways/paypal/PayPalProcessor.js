import { PaymentProcessor } from "../../abstract/PaymentProcessor.js";
import { CurrencyValidator } from "../../utils/CurrencyValidator.js";
export class PayPalProcessor extends PaymentProcessor {
    async processPayment(amount, currency) {
        // Simulate PayPal payment processing
        const formattedAmount = CurrencyValidator.formatCurrency(amount, currency);
        console.log(`Processing ${formattedAmount} payment via PayPal...`);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Simulate random success/failure (85% success rate)
        const success = Math.random() > 0.15;
        if (success) {
            const transactionId = `paypal_txn_${Date.now()}`;
            return { success: true, transactionId, message: "Payment successful" };
        }
        else {
            return {
                success: false,
                message: "Payment failed: Transaction declined",
            };
        }
    }
}
