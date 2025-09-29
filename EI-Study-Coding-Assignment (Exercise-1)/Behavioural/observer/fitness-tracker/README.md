# Fitness Tracker System

The Fitness Tracker is a **TypeScript-based console application** that helps users record and monitor fitness activities. It provides a command-line interface for logging workouts, calculating calories burned, and reviewing activity history. The system demonstrates **object-oriented design principles**, **Observer pattern implementation**, and interactive user input handling.

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

* **Activity Logging:** Record running, cycling, swimming, or walking sessions
* **Calories Tracking:** Automatically calculate and update total calories burned
* **History Review:** Store and retrieve all past activities
* **Interactive CLI:** Guided input prompts for easy data entry
* **Observer Pattern:** Real-time calorie tracking when new activities are added

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
   cd fitness-tracker
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

   * Enter the **activity type** (running/cycling/swimming/walking)
   * Provide **duration (minutes)**, **calories burned**, and **distance (km)**
   * Choose whether to add another activity or exit

---

## Command Examples

| Input Example | Description             |
| ------------- | ----------------------- |
| `running`     | Logs a running activity |
| `30`          | Duration (minutes)      |
| `250`         | Calories burned         |
| `5`           | Distance (km)           |
| `y`           | Add another activity    |
| `n`           | Exit the tracker        |

---

## Design Overview

The system applies object-oriented design principles with the following core components:

* **FitnessTracker Class**: Manages activity storage and notifies observers when new activities are added.
* **CalorieTracker Class**: Observer that maintains and displays total calories burned.
* **InputHandler Class**: Provides CLI input prompts and user interaction.
* **Activity Model**: Defines structure for recorded activities (type, duration, calories, distance, date).

---

## SOLID Principles and Design Patterns

* **Single Responsibility:** Each class has one focused purpose (`InputHandler` handles input, `CalorieTracker` handles calorie tracking).
* **Open/Closed Principle:** New observers (e.g., DistanceTracker) can be added without modifying `FitnessTracker`.
* **Liskov Substitution:** All observers implement the same interface and are interchangeable.
* **Interface Segregation:** Observer interface ensures minimal and clear contract.
* **Dependency Inversion:** High-level modules depend on abstractions (`Observer`) instead of concrete implementations.

### Design Patterns

* **Observer Pattern:** `FitnessTracker` notifies observers (e.g., `CalorieTracker`) whenever an activity is logged.

---

## Error Handling

* **Invalid Input:** Activity types outside of (running, cycling, swimming, walking) trigger validation errors and re-prompting.
* **Graceful Exit:** CLI closes properly on user request.
* **Type Safety:** TypeScript ensures activities are logged with correct data structures.

---

## Sample Output

<img width="1548" height="833" alt="image" src="https://github.com/user-attachments/assets/73fa6a84-ee9c-475c-ac51-d9014219b7cf" />
