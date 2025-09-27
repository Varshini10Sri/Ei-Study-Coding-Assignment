
# Satellite Command System Programming Exercise

The Satellite Control System is a Java-based simulator that models satellite operations in orbit. It provides a command-line interface for users to control satellite orientation, manage solar panels, and collect scientific data. The system demonstrates object-oriented design principles, command pattern implementation, and robust error handling.


## Table of Contents


- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Command Examples](#command-examples)
- [Design Overview](#design-overview)
- [SOLID Principles and Design Patterns](#solid-principles-and-design-patterns)
- [Logging and Error Handling](#logging-and-error-handling)

## Features

- **Rotation Control:** Adjust satellite orientation (North/South/East/West)
- **Solar Panel Management:** Activate/deactivate solar panels for power
- **Data Collection:** Collect scientific data when panels are active
- **Command History:** Track all executed commands
- **Robust Logging:** Detailed logs for operations and errors
- **Input Validation:** Ensure valid commands and parameters

## Prerequisites

**Java Development Kit (JDK)** 8 or higher installed
## Installation

1. Clone the repository:

   ```bash  ''
   git clone 
2. Navigate to the project directory:

   ```bash
   cd "Satellite Command System"

3. Compile the Java code:

   ```bash
   javac Main.java
## Usage

1. Run the application:
   
   ```bash
   java Main
   
2. Interact with Satellite:
- Enter commands as prompted **(e.g., rotate(South))**
- Type exit to terminate the session


## Commands 

| Command               | Description                          |
|-----------------------|--------------------------------------|
| `rotate(North)`       | Set orientation to North             |
| `activatepanels()`    | Turn on solar panels                 |
| `deactivatepanels()`  | Turn off solar panels                |
| `collectdata()`       | Collect data (requires active panels)|

## Design Overview

The system employs object-oriented principles with these core components:

- **Satellite Class**: Maintains satellite state (orientation, solar panel status, data collected) and executes operations like rotation, panel control, and data collection.
- **Command Pattern**: Encapsulates each operation (e.g., rotation, panel activation) in dedicated command classes, decoupling requests from execution for flexibility.
- **Logging**: Uses Java’s `util.logging` via `SatelliteLogger` to log all operations (info) and errors (severe) for traceability.
- **Error Handling**: Manages invalid inputs (e.g., incorrect directions) and transient errors (e.g., data collection without active panels) with centralized error reporting.
## SOLID Principles and Design Patterns

- **Single Responsibility**: Each class has one focused purpose (e.g., `Satellite` manages state, `Logger` handles logging)
- **Open/Closed Principle**: New commands added via extension (not modification)
- **Liskov Substitution**: Command subclasses interchangeable with base interface
- **Interface Segregation**: Separate interfaces (`Logging`, `Validator`) avoid unnecessary dependencies
- **Dependency Inversion**: High-level modules depend on abstractions (e.g., `Satellite` depends on `Logging` interface)

### Design Patterns
- **Command Pattern**: Encapsulates operations as objects (e.g., `RotateCommand`)
- **Singleton Pattern**: `SatelliteLogger` ensures single logging instance
- **Observer Pattern**: Logging reacts to satellite state changes

---


## Logging and Error Handling

The application includes a logging mechanism using the SatelliteLogger class. Exception handling is implemented to handle invalid inputs, and transient error handling is incorporated for data collection.

## Required Output

PS C:\Users\Vaishali\Desktop\EI interview\Ei-Study-Coding-Project\EI-Study-Coding-Assignment (Exercise -2)>  & 'C:\Program Files\Java\jdk-25\bin\java.exe' '-XX:+ShowCodeDetailsInExceptionMessages' '-cp' 'C:\Users\Vaishali\AppData\Roaming\Cursor\User\workspaceStorage\e1494d46003dda66a2f598191ff20d81\redhat.java\jdt_ws\EI-Study-Coding-Assignment (Exercise -2)_42f338e5\bin' 'Main'
Available commands:
1. rotate(direction) - where direction can be: North/north, South/south, East/east, West/west
2. activatepanels() - activate solar panels
3. deactivatepanels() - deactivate solar panels
4. collectdata() - collect data from satellite
Enter command (or 'exit' to finish): rotate(North)
Sept 26, 2025 9:37:05 AM SatelliteLogger log
INFO: Log: Satellite rotated to North.
Enter command (or 'exit' to finish): activatePanels()
Sept 26, 2025 9:37:16 AM SatelliteLogger log
INFO: Log: Solar panels activated.
Enter command (or 'exit' to finish): collectData()
Sept 26, 2025 9:37:25 AM SatelliteLogger log
INFO: Log: Data collected.
Enter command (or 'exit' to finish): deactivatePanels()
Sept 26, 2025 9:37:35 AM SatelliteLogger log
INFO: Log: Solar panels deactivated.
Enter command (or 'exit' to finish): rotate(East)
Sept 26, 2025 9:37:51 AM SatelliteLogger log
INFO: Log: Satellite rotated to East.
Enter command (or 'exit' to finish): activatePanels()
Sept 26, 2025 9:38:00 AM SatelliteLogger log
INFO: Log: Solar panels activated.
Enter command (or 'exit' to finish): exit

Final State:
Orientation: East
Solar Panels: Active
Data Collected: 10

Command History:
RotateCommand
ActivatePanelsCommand
CollectDataCommand
DeactivatePanelsCommand
RotateCommand
ActivatePanelsCommand
PS C:\Users\Vaishali\Desktop\EI interview\Ei-Study-Coding-Project\EI-Study-Coding-Assignment (Exercise -2)>