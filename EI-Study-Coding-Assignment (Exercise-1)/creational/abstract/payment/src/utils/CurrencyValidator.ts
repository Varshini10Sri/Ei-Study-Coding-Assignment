export class CurrencyValidator {
  private static readonly SUPPORTED_CURRENCIES = {
    USD: { symbol: '$', name: 'US Dollar' },
    EUR: { symbol: '€', name: 'Euro' },
    GBP: { symbol: '£', name: 'British Pound' },
    INR: { symbol: '₹', name: 'Indian Rupee' }
  };

  static isValidCurrency(currency: string): boolean {
    return currency.toUpperCase() in this.SUPPORTED_CURRENCIES;
  }

  static getCurrencySymbol(currency: string): string {
    const upperCurrency = currency.toUpperCase();
    return this.SUPPORTED_CURRENCIES[upperCurrency as keyof typeof this.SUPPORTED_CURRENCIES]?.symbol || currency;
  }

  static getCurrencyName(currency: string): string {
    const upperCurrency = currency.toUpperCase();
    return this.SUPPORTED_CURRENCIES[upperCurrency as keyof typeof this.SUPPORTED_CURRENCIES]?.name || currency;
  }

  static getSupportedCurrencies(): string[] {
    return Object.keys(this.SUPPORTED_CURRENCIES);
  }

  static formatCurrency(amount: number, currency: string): string {
    const symbol = this.getCurrencySymbol(currency);
    const upperCurrency = currency.toUpperCase();
    
    // Different formatting for INR (Indian numbering system)
    if (upperCurrency === 'INR') {
      // Indian numbering system: 1,00,000 instead of 100,000
      const formattedAmount = this.formatIndianNumber(amount);
      return `${symbol}${formattedAmount}`;
    }
    
    // Standard formatting for other currencies
    return `${symbol}${amount.toFixed(2)}`;
  }

  private static formatIndianNumber(num: number): string {
    const [integer, decimal] = num.toFixed(2).split('.');
    
    // Indian numbering system: groups of 2 digits except for the last group which can be 3
    let result = '';
    let integerPart = integer;
    
    // Process last 3 digits (if any)
    if (integerPart.length > 3) {
      result = integerPart.slice(-3) + result;
      integerPart = integerPart.slice(0, -3);
    } else {
      result = integerPart + result;
      integerPart = '';
    }
    
    // Process remaining digits in groups of 2
    while (integerPart.length > 0) {
      if (integerPart.length >= 2) {
        result = integerPart.slice(-2) + ',' + result;
        integerPart = integerPart.slice(0, -2);
      } else {
        result = integerPart + ',' + result;
        integerPart = '';
      }
    }
    
    return result + '.' + decimal;
  }
}
