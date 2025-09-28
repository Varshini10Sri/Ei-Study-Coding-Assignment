import { PaymentValidator } from "../../abstract/PaymentValidator.js";
import { CurrencyValidator } from "../../utils/CurrencyValidator.js";
export class PayPalValidator extends PaymentValidator {
    validateCardDetails(cardNumber, expiryDate, cvv) {
        // Simple validation for demo purposes
        const cardNumberValid = /^\d{16}$/.test(cardNumber.replace(/\s/g, ""));
        const expiryDateValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate);
        const cvvValid = /^\d{3}$/.test(cvv);
        return cardNumberValid && expiryDateValid && cvvValid;
    }
    validateAmount(amount) {
        return amount > 0 && amount <= 5000; // Max $5,000
    }
    validateCurrency(currency) {
        return CurrencyValidator.isValidCurrency(currency);
    }
}
