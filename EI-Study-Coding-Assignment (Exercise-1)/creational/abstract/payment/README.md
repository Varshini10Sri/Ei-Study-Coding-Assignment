# Payment Gateway Integration System

The Payment Gateway Integration System is a TypeScript-based console application that demonstrates payment processing using multiple payment gateways (Stripe and PayPal). It provides a command-line interface for processing payments with comprehensive validation, currency support, and transaction tracking. The system demonstrates object-oriented design principles, **Abstract Factory pattern implementation**, and interactive user input handling.

---

## Table of Contents

* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)
* [Command Examples](#command-examples)
* [Design Overview](#design-overview)
* [SOLID Principles and Design Patterns](#solid-principles-and-design-patterns)
* [Error Handling](#error-handling)
* [Sample Output](#sample-output)

---

## Features

* **Multi-Gateway Support:** Process payments through Stripe or PayPal gateways
* **Payment Validation:** Comprehensive validation for card details, amounts, and currencies
* **Currency Support:** Support for multiple currencies with proper formatting
* **Transaction Tracking:** Generate unique transaction IDs for successful payments
* **Interactive CLI:** Guided input prompts for easy payment processing
* **Abstract Factory Pattern:** Flexible gateway switching without code changes

---

## Architecture

```
src/
├── abstract/
│   ├── PaymentGatewayFactory.ts    # Abstract factory interface
│   ├── PaymentProcessor.ts         # Abstract processor interface
│   └── PaymentValidator.ts         # Abstract validator interface
├── gateways/
│   ├── stripe/
│   │   ├── StripeFactory.ts        # Stripe factory implementation
│   │   ├── StripeProcessor.ts      # Stripe payment processing
│   │   └── StripeValidation.ts     # Stripe validation logic
│   └── paypal/
│       ├── PayPalFactory.ts        # PayPal factory implementation
│       ├── PayPalProcessor.ts      # PayPal payment processing
│       └── PayPalValidator.ts      # PayPal validation logic
├── models/
│   └── PaymentDetails.ts           # Payment data structure
├── utils/
│   ├── InputHandler.ts             # CLI input handling
│   └── CurrencyValidator.ts        # Currency validation and formatting
└── index.ts                        # Main application entry point
```


## Prerequisites

* **Node.js** (v16 or higher)
* **TypeScript** (latest stable version)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/payment-gateway.git
   ```

2. Navigate to the project directory:

   ```bash
   cd payment-gateway
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

## Usage

1. Start the application:

   ```bash
   npm run dev
   ```

2. Follow the interactive prompts:

   * Select a **payment gateway** (Stripe or PayPal)
   * Enter **card details** (number, expiry, CVV, cardholder name)
   * Provide **amount** and **currency**
   * Review payment processing results

---

## Command Examples

| Input Example | Description                    |
| ------------- | ------------------------------ |
| `1`           | Select Stripe gateway          |
| `2`           | Select PayPal gateway          |
| `4111111111111111` | Valid test card number        |
| `12/25`       | Expiry date (MM/YY)            |
| `123`         | CVV code                       |
| `John Doe`    | Cardholder name                |
| `100.50`      | Payment amount                 |
| `USD`         | Currency code                  |
| `y`           | Process another payment        |
| `n`           | Exit the application           |

---

## Design Overview

The system applies object-oriented design principles with the following core components:

* **PaymentGatewayFactory (Abstract):** Defines the interface for creating payment processors and validators.
* **StripeFactory/PayPalFactory:** Concrete implementations for specific payment gateways.
* **PaymentProcessor (Abstract):** Handles payment processing logic for each gateway.
* **PaymentValidator (Abstract):** Validates payment details, amounts, and currencies.
* **InputHandler Class:** Provides CLI input prompts and user interaction.
* **PaymentDetails Model:** Defines structure for payment information.

---

## SOLID Principles and Design Patterns

* **Single Responsibility:** Each class has one focused purpose (`InputHandler` handles input, `PaymentProcessor` handles processing, `PaymentValidator` handles validation).
* **Open/Closed Principle:** New payment gateways can be added by implementing the factory interface without modifying existing code.
* **Liskov Substitution:** All payment processors and validators implement the same interfaces and are interchangeable.
* **Interface Segregation:** Separate interfaces for processors and validators ensure minimal and clear contracts.
* **Dependency Inversion:** High-level modules depend on abstractions (`PaymentGatewayFactory`) instead of concrete implementations.

### Design Patterns

* **Abstract Factory Pattern:** `PaymentGatewayFactory` creates families of related objects (processors and validators) for different payment gateways.
* **Factory Method Pattern:** Each concrete factory creates appropriate processor and validator instances.

---

## Error Handling

* **Invalid Gateway Selection:** Invalid gateway choices trigger re-prompting with clear error messages.
* **Card Validation:** Invalid card numbers, expiry dates, or CVV codes are caught and reported.
* **Amount Validation:** Negative amounts or invalid numeric inputs are rejected.
* **Currency Validation:** Unsupported currencies are identified and alternative options suggested.
* **Payment Processing:** Failed payments return detailed error messages with transaction status.

---

## Sample Output

```bash
> npm run dev

=== Payment Gateway Integration System ===
This application uses the Abstract Factory pattern to process payments.

=== Payment Gateway Selection ===
1. Stripe
2. PayPal
Select payment gateway (1-2): 1

=== Payment Details ===
Card Number: 4111111111111111
Expiry Date (MM/YY): 12/25
CVV: 123
Cardholder Name: John Doe
Amount: 100.50
Currency (USD, EUR, GBP, CAD, AUD): USD

Processing payment...
Processing $100.50 payment via Stripe...

✅ Payment successful!
Transaction ID: stripe_txn_1703123456789
Amount: $100.50
Cardholder: John Doe
Process another payment? (y/n): n

Thank you for using the Payment Gateway Integration System!
```

---


