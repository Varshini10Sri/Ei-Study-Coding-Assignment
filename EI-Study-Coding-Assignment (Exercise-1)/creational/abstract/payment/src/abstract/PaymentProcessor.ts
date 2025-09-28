export abstract class PaymentProcessor {
  abstract processPayment(
    amount: number,
    currency: string
  ): Promise<{ success: boolean; transactionId?: string; message?: string }>;
}
