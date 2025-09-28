# Configuration Manager

The Configuration Manager is a TypeScript-based console application that demonstrates the **Singleton design pattern** for managing application settings and configuration data. It provides a command-line interface for setting, retrieving, listing, and managing configuration values with support for different data types (string, number, boolean). The system showcases object-oriented design principles and interactive user input handling.

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

* **Configuration Management:** Set, get, update, and delete configuration settings
* **Type Support:** Automatic type detection and storage for strings, numbers, and booleans
* **Singleton Pattern:** Ensures single instance of configuration manager across the application
* **Interactive CLI:** Guided menu-driven interface for easy configuration management
* **Data Persistence:** Maintains configuration state throughout the application session
* **Type Safety:** Full TypeScript support with proper type checking

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
   cd config-manager
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

2. Follow the interactive menu:

   * **Option 1:** Set a new configuration (key-value pair)
   * **Option 2:** Retrieve a configuration value by key
   * **Option 3:** List all current configurations
   * **Option 4:** Delete a specific configuration
   * **Option 5:** Clear all configurations
   * **Option 6:** Exit the application

---

## Command Examples

| Input Example | Description             |
| ------------- | ----------------------- |
| `database_url` | Configuration key       |
| `localhost:5432` | String value           |
| `max_connections` | Configuration key       |
| `100`         | Number value            |
| `debug_mode`  | Configuration key       |
| `true`        | Boolean value           |
| `y`           | Continue operation      |
| `n`           | Exit the application    |

---

## Design Overview

The system applies object-oriented design principles with the following core components:

* **ConfigManager Class**: Singleton class that manages configuration storage and provides CRUD operations.
* **InputHandler Class**: Handles CLI input prompts and user interaction with type detection.
* **Config Interface**: Defines the structure for configuration data with flexible key-value pairs.
* **ConfigEntry Interface**: Represents individual configuration entries with type information.

---

## SOLID Principles and Design Patterns

* **Single Responsibility:** Each class has one focused purpose (`InputHandler` handles input, `ConfigManager` handles configuration storage).
* **Open/Closed Principle:** The system can be extended with new configuration types without modifying existing code.
* **Liskov Substitution:** All configuration values implement the same interface and are interchangeable.
* **Interface Segregation:** Clean interfaces ensure minimal and focused contracts.
* **Dependency Inversion:** High-level modules depend on abstractions (`Config` interface) instead of concrete implementations.

### Design Patterns

* **Singleton Pattern:** `ConfigManager` ensures only one instance exists throughout the application lifecycle, providing global access to configuration data.

---

## Error Handling

* **Invalid Input:** Empty or invalid configuration keys trigger validation and re-prompting.
* **Type Detection:** Automatic type conversion for boolean and numeric values with fallback to string.
* **Key Validation:** Graceful handling of non-existent configuration keys.
* **Type Safety:** TypeScript ensures configuration operations use correct data structures.

---

## Sample Output

```bash
$ npm run dev

Welcome to Configuration Manager!
This application uses the Singleton pattern to manage settings.

=== Configuration Manager ===
1. Set a configuration
2. Get a configuration
3. List all configurations
4. Delete a configuration
5. Clear all configurations
6. Exit
Select an option (1-6): 1

Enter configuration key: database_url
Enter configuration value: localhost:5432
✅ Setting saved: database_url = localhost:5432
Continue? (y/n): y

=== Configuration Manager ===
1. Set a configuration
2. Get a configuration
3. List all configurations
4. Delete a configuration
5. Clear all configurations
6. Exit
Select an option (1-6): 1

Enter configuration key: max_connections
Enter configuration value: 100
✅ Setting saved: max_connections = 100
Continue? (y/n): y

=== Configuration Manager ===
1. Set a configuration
2. Get a configuration
3. List all configurations
4. Delete a configuration
5. Clear all configurations
6. Exit
Select an option (1-6): 2

Enter configuration key: database_url
database_url: localhost:5432 (string)
Continue? (y/n): y

=== Configuration Manager ===
1. Set a configuration
2. Get a configuration
3. List all configurations
4. Delete a configuration
5. Clear all configurations
6. Exit
Select an option (1-6): 3

=== Current Configuration ===
database_url: localhost:5432 (string)
max_connections: 100 (number)
============================

Continue? (y/n): n

Thank you for using Configuration Manager!
```
