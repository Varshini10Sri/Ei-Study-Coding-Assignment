import * as readline from "readline";
import { PaymentDetails } from "../models/PaymentDetails.js";
import { CurrencyValidator } from "./CurrencyValidator.js";

export class InputHandler {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  async promptForPaymentGateway(): Promise<string> {
    console.log("\n=== Payment Gateway Selection ===");
    console.log("1. Stripe");
    console.log("2. PayPal");

    const choice = await this.promptInput("Select payment gateway (1-2): ");
    if (choice === "1") return "stripe";
    if (choice === "2") return "paypal";

    console.log("Invalid option. Please try again.");
    return this.promptForPaymentGateway();
  }

  async promptForPaymentDetails(): Promise<PaymentDetails> {
    console.log("\n=== Payment Details ===");

    const cardNumber = await this.promptInput("Card Number: ");
    const expiryDate = await this.promptInput("Expiry Date (MM/YY): ");
    const cvv = await this.promptInput("CVV: ");
    const cardholderName = await this.promptInput("Cardholder Name: ");
    const amount = parseFloat(await this.promptInput("Amount: "));
    const supportedCurrencies = CurrencyValidator.getSupportedCurrencies().join(', ');
    const currency = await this.promptInput(`Currency (${supportedCurrencies}): `);

    return {
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
      amount,
      currency,
    };
  }

  async promptInput(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  async promptContinue(): Promise<boolean> {
    const answer = await this.promptInput("Process another payment? (y/n): ");
    return answer.toLowerCase() === "y";
  }

  close(): void {
    this.rl.close();
  }
}
