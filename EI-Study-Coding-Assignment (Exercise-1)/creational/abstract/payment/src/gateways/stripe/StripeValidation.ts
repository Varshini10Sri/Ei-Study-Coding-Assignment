import { PaymentValidator } from "../../abstract/PaymentValidator.js";
import { CurrencyValidator } from "../../utils/CurrencyValidator.js";

export class StripeValidator extends PaymentValidator {
  validateCardDetails(
    cardNumber: string,
    expiryDate: string,
    cvv: string
  ): boolean {
    // Simple validation for demo purposes
    const cardNumberValid = /^\d{16}$/.test(cardNumber.replace(/\s/g, ""));
    const expiryDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
    const cvvValid = /^\d{3,4}$/.test(cvv);

    return cardNumberValid && expiryDateValid && cvvValid;
  }

  validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 10000; // Max $10,000
  }

  validateCurrency(currency: string): boolean {
    return CurrencyValidator.isValidCurrency(currency);
  }
}
