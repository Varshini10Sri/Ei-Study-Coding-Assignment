import { StripeFactory } from "./gateways/stripe/StripeFactory.js";
import { PayPalFactory } from "./gateways/paypal/PayPalFactory.js";
import { InputHandler } from "./utils/InputHandler.js";
import { CurrencyValidator } from "./utils/CurrencyValidator.js";
async function processPayment(factory, paymentDetails) {
    const validator = factory.createPaymentValidator();
    const processor = factory.createPaymentProcessor();
    // Validate card details
    const isCardValid = validator.validateCardDetails(paymentDetails.cardNumber, paymentDetails.expiryDate, paymentDetails.cvv);
    if (!isCardValid) {
        console.log("\n❌ Invalid card details. Please check your input.");
        return;
    }
    // Validate amount
    const isAmountValid = validator.validateAmount(paymentDetails.amount);
    if (!isAmountValid) {
        console.log("\n❌ Invalid amount. Please check the amount and try again.");
        return;
    }
    // Validate currency
    const isCurrencyValid = validator.validateCurrency(paymentDetails.currency);
    if (!isCurrencyValid) {
        console.log("\n❌ Invalid currency. Please check the currency and try again.");
        return;
    }
    // Process payment
    console.log("\nProcessing payment...");
    const result = await processor.processPayment(paymentDetails.amount, paymentDetails.currency);
    if (result.success) {
        console.log(`\n✅ Payment successful!`);
        console.log(`Transaction ID: ${result.transactionId}`);
        const formattedAmount = CurrencyValidator.formatCurrency(paymentDetails.amount, paymentDetails.currency);
        console.log(`Amount: ${formattedAmount}`);
        console.log(`Cardholder: ${paymentDetails.cardholderName}`);
    }
    else {
        console.log(`\n❌ Payment failed: ${result.message}`);
    }
}
async function main() {
    const inputHandler = new InputHandler();
    console.log("=== Payment Gateway Integration System ===");
    console.log("This application uses the Abstract Factory pattern to process payments.\n");
    let processing = true;
    while (processing) {
        // Get payment gateway selection
        const gateway = await inputHandler.promptForPaymentGateway();
        // Create appropriate factory
        let factory;
        if (gateway === "stripe") {
            factory = new StripeFactory();
        }
        else {
            factory = new PayPalFactory();
        }
        // Get payment details
        const paymentDetails = await inputHandler.promptForPaymentDetails();
        // Process payment
        await processPayment(factory, paymentDetails);
        // Ask if user wants to process another payment
        processing = await inputHandler.promptContinue();
    }
    console.log("\nThank you for using the Payment Gateway Integration System!");
    inputHandler.close();
}
main().catch(console.error);
