export abstract class PaymentValidator {
  abstract validateCardDetails(
    cardNumber: string,
    expiryDate: string,
    cvv: string
  ): boolean;
  abstract validateAmount(amount: number): boolean;
  abstract validateCurrency(currency: string): boolean;
}
