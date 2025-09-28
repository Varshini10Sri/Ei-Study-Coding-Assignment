# Smart Travel Planner

The Smart Travel Planner is a TypeScript-based console application that helps users compare and select the best transportation options for their journeys. It provides a command-line interface for analyzing travel routes across multiple transport modes (Car, Plane, Train, Bus) with detailed cost, time, comfort, and suitability calculations. The system demonstrates object-oriented design principles, Strategy pattern implementation, and interactive user input handling.

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

* **Multi-Transport Planning:** Compare Car, Plane, Train, and Bus options for any route
* **Smart Recommendations:** AI-powered suitability scoring based on user preferences
* **Detailed Analysis:** Cost, time, comfort ratings, and personalized descriptions
* **Interactive CLI:** Guided input prompts for origin, destination, budget, and preferences
* **Strategy Pattern:** Extensible design for adding new transportation modes
* **Distance Calculation:** Built-in distance lookup for major US cities

---

## Prerequisites

* **Node.js** (v16 or higher)
* **TypeScript** (latest stable version)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Varshini10Sri/Ei-Study-Coding-Assignment
   ```

2. Navigate to the project directory:

   ```bash
   cd smart-travel-planner
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

   * Enter **origin** and **destination** locations
   * Specify your **budget**, **time limit**, and **number of passengers**
   * Choose your **preferences** for cost, time, and comfort levels
   * Review all available transport options with detailed comparisons
   * Get personalized recommendations based on your criteria

---

## Command Examples

| Input Example | Description |
| ------------- | ----------- |
| `New York` | Origin location |
| `Los Angeles` | Destination location |
| `500` | Budget in dollars |
| `8` | Time limit in hours |
| `2` | Number of passengers |
| `1` | Cost preference: low (1), medium (2), high (3) |
| `2` | Time preference: fast (1), moderate (2), slow (3) |
| `2` | Comfort preference: basic (1), standard (2), luxury (3) |
| `y` | Plan another trip |
| `n` | Exit the planner |

---

## Design Overview

The system applies object-oriented design principles with the following core components:

* **TravelPlanner Class**: Context class that manages transportation strategies and coordinates trip planning.
* **TravelStrategy Interface**: Defines the contract for all transportation algorithms (Car, Plane, Train, Bus).
* **Concrete Strategies**: Individual implementations for each transport mode with specific calculation logic.
* **InputHandler Class**: Provides CLI input prompts, validation, and user interaction management.
* **TravelOptions Model**: Defines the structure for user inputs (origin, destination, preferences, constraints).

---

## SOLID Principles and Design Patterns

* **Single Responsibility:** Each class has one focused purpose (`InputHandler` handles input, `CarStrategy` handles car calculations).
* **Open/Closed Principle:** New transport strategies can be added without modifying existing code (`TravelPlanner` remains unchanged).
* **Liskov Substitution:** All strategies implement the same interface and are interchangeable.
* **Interface Segregation:** `TravelStrategy` interface ensures minimal and clear contract for all transport modes.
* **Dependency Inversion:** `TravelPlanner` depends on `TravelStrategy` abstraction, not concrete implementations.

### Design Patterns

* **Strategy Pattern:** `TravelPlanner` uses different `TravelStrategy` implementations to calculate optimal routes for various transport modes.
* **Template Method:** Common calculation structure across all strategies with customizable logic per transport type.

---

## Error Handling

* **Input Validation:** Invalid preferences trigger re-prompting with clear error messages.
* **Graceful Exit:** CLI closes properly on user request with cleanup.
* **Type Safety:** TypeScript ensures all travel options are validated with correct data structures.
* **Fallback Values:** Unknown city distances default to reasonable estimates.

---

## Sample Output

```bash
> npm run dev

Welcome to Smart Travel Planner!
==================================================
Plan your journey with multiple transport options:
• Car - Flexible and comfortable for short-medium distances
• Plane - Fastest for long distances
• Train - Eco-friendly and scenic
• Bus - Most economical option
==================================================
We'll calculate distance, cost, time, and comfort for each option!

=== Smart Travel Planner ===
Let's plan your journey! Please provide the following details:

Origin location: New York
Destination location: Los Angeles

Distance from New York to Los Angeles: 3944 km

Budget ($): 800
Time limit (hours): 12
Number of passengers: 2

Now, let us know your preferences:

Cost preference:
1. low
2. medium
3. high
Select an option: 2

Time preference:
1. fast
2. moderate
3. slow
Select an option: 1

Comfort preference:
1. basic
2. standard
3. luxury
Select an option: 2

=== Available Transport Options ===
Here are your travel options with detailed information:

1. PLANE
   Route: New York → Los Angeles
   Distance: 3944 km
   Cost: $988
   Time: 5.5 hours
   Comfort: 9/10
   Suitability: 95%
   Travel by plane from New York to Los Angeles (3944km). Fastest option for long distances with high comfort.

2. CAR
   Route: New York → Los Angeles
   Distance: 3944 km
   Cost: $592
   Time: 65.7 hours
   Comfort: 7/10
   Suitability: 45%
   Travel by car from New York to Los Angeles (3944km). Estimated cost: $592, time: 65.7 hours.

3. TRAIN
   Route: New York → Los Angeles
   Distance: 3944 km
   Cost: $394
   Time: 48.0 hours
   Comfort: 8/10
   Suitability: 35%
   Travel by train from New York to Los Angeles (3944km). Eco-friendly and scenic journey.

4. BUS
   Route: New York → Los Angeles
   Distance: 3944 km
   Cost: $197
   Time: 65.7 hours
   Comfort: 4/10
   Suitability: 25%
   Travel by bus from New York to Los Angeles (3944km). Most economical option for budget travelers.

============================================================
RECOMMENDED: PLANE
   Best match with 95% suitability
   Cost: $988 | Time: 5.5 hours | Comfort: 9/10
============================================================

Plan another trip? (y/n): n

Thank you for using Smart Travel Planner!
```
