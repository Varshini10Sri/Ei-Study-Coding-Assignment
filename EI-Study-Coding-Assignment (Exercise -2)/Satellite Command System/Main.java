import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.logging.ConsoleHandler;
import java.util.logging.Handler;
import java.util.logging.Level;
import java.util.logging.Logger;

// Logger interface for logging
interface Logging {
    void log(String message);
    void logError(String errorMessage);
}

// Logger class implementing Logging interface
class SatelliteLogger implements Logging {
   private static final Logger logger;

    static {
        logger = Logger.getLogger(SatelliteLogger.class.getName());

        // Ensure ConsoleHandler is added only once
        if (logger.getHandlers().length == 0) {
            Handler consoleHandler = new ConsoleHandler();
            consoleHandler.setLevel(Level.ALL);
            logger.addHandler(consoleHandler);
        }

        logger.setUseParentHandlers(false); // Prevents the logger from inheriting handlers from its parent
        logger.setLevel(Level.ALL);
    }

    @Override
    public void log(String message) {
        logger.info("Log: " + message);
    }

    @Override
    public void logError(String errorMessage) {
        logger.severe("Error: " + errorMessage);
    }
}

// ErrorHandler class for handling errors
class ErrorHandler {
    private final Logging logger;

    public ErrorHandler(Logging logger) {
        this.logger = logger;
    }

    public void handle_error(String error_message) {
        logger.logError(error_message);
    }
}


// Command interface
interface Command {
    void execute();
}

// Concrete command for rotating the satellite
class RotateCommand implements Command {
    private final Satellite satellite;
    private final String direction;

    public RotateCommand(Satellite satellite, String direction) {
        this.satellite = satellite;
        this.direction = direction;
    }

    @Override
    public void execute() {
        try {
            satellite.rotate(direction);
        } catch (IllegalArgumentException e) {
            ErrorHandler errorHandler = new ErrorHandler(satellite.getLogger());
            errorHandler.handle_error(e.getMessage());
        }
    }
}



// Concrete command for activating solar panels
class ActivatePanelsCommand implements Command {
    private final Satellite satellite;

    public ActivatePanelsCommand(Satellite satellite) {
        this.satellite = satellite;
    }

    @Override
    public void execute() {
        satellite.activate_panels();
    }
}

// Concrete command for deactivating solar panels
class DeactivatePanelsCommand implements Command {
    private final Satellite satellite;

    public DeactivatePanelsCommand(Satellite satellite) {
        this.satellite = satellite;
    }

    @Override
    public void execute() {
        satellite.deactivate_panels();
    }
}

// Concrete command for collecting data
class CollectDataCommand implements Command {
    private final Satellite satellite;

    public CollectDataCommand(Satellite satellite) {
        this.satellite = satellite;
    }

    @Override
    public void execute() {
        satellite.collect_data();
    }
}

// Invoker class to execute commands
class CommandInvoker {
    private final List<Command> commandHistory = new ArrayList<>();

    public void executeCommand(Command command) {
        command.execute();
        commandHistory.add(command);
    }

    public List<Command> getCommandHistory() {
        return commandHistory;
    }
}

// Satellite class
class Satellite {
    private String orientation = "North";
    private String solarPanelsStatus = "Inactive";
    private int dataCollected = 0;

    private final Logging logger;

    public Satellite(Logging logger) {
        this.logger = logger;
    }

    public void rotate(String direction) {
        if (direction.matches("(?i)North|South|East|West")) {
            // Capitalize the first letter for consistency
            String capitalizedDirection = direction.substring(0, 1).toUpperCase() + 
                                        direction.substring(1).toLowerCase();
            orientation = capitalizedDirection;
            logger.log("Satellite rotated to " + capitalizedDirection + ".");
        } else {
            throw new IllegalArgumentException("Invalid direction");
        }
    }

    public void activate_panels() {
        solarPanelsStatus = "Active";
        logger.log("Solar panels activated.");
    }

    public void deactivate_panels() {
        solarPanelsStatus = "Inactive";
        logger.log("Solar panels deactivated.");
    }

    public void collect_data() {
        if ("Active".equals(solarPanelsStatus)) {
            dataCollected += 10;
            logger.log("Data collected.");
        } else {
            logger.log("Cannot collect data. Solar panels are inactive.");
        }
    }

    public String getOrientation() {
        return orientation;
    }

    public String getSolarPanelsStatus() {
        return solarPanelsStatus;
    }

    public int getDataCollected() {
        return dataCollected;
    }

    public Logging getLogger() {
        return logger;
    }
}

// Abstract class for Validation
abstract class Validator {
    public abstract boolean validate(String value);
}

// Concrete class for DirectionValidation
class DirectionValidator extends Validator {
    @Override
    public boolean validate(String value) {
        return value.matches("(?i)North|South|East|West");
    }
}

// Client code for user input
public class Main {
    public static void main(String[] args) {
        SatelliteLogger logger = new SatelliteLogger();
        Satellite satellite = new Satellite(logger);
        CommandInvoker invoker = new CommandInvoker();
        ErrorHandler errorHandler = new ErrorHandler(logger);
        Validator directionValidator = new DirectionValidator();

        Scanner scanner = new Scanner(System.in);

        // Display available commands at the beginning
        System.out.println("Available commands:");
        System.out.println("1. rotate(direction) - where direction can be: North/north, South/south, East/east, West/west");
        System.out.println("2. activatepanels() - activate solar panels");
        System.out.println("3. deactivatepanels() - deactivate solar panels");
        System.out.println("4. collectdata() - collect data from satellite");
        
        while (true) {
            System.out.print("Enter command (or 'exit' to finish): ");
            String userInput = scanner.nextLine();

            if ("exit".equalsIgnoreCase(userInput)) {
                break;
            }

            try {
                String[] commandParts = userInput.split("\\(");
                String commandName = commandParts[0].trim();
                String argument = commandParts[1].substring(0, commandParts[1].length() - 1).trim();

                switch (commandName.toLowerCase()) {
                    case "rotate":
                        if (directionValidator.validate(argument)) {
                            invoker.executeCommand(new RotateCommand(satellite, argument));
                        } else {
                            errorHandler.handle_error("Invalid direction. Try again.");
                        }
                        break;
                    case "activatepanels":
                        invoker.executeCommand(new ActivatePanelsCommand(satellite));
                        break;
                    case "deactivatepanels":
                        invoker.executeCommand(new DeactivatePanelsCommand(satellite));
                        break;
                    case "collectdata":
                        invoker.executeCommand(new CollectDataCommand(satellite));
                        break;
                    default:
                        System.out.println("Invalid command. Try again.");
                        break;
                }

            } catch (ArrayIndexOutOfBoundsException e) {
                System.out.println("Invalid input format. Try again.");
            }
        }
        scanner.close();

        // Display final state
        System.out.println("\nFinal State:");
        System.out.println("Orientation: " + satellite.getOrientation());
        System.out.println("Solar Panels: " + satellite.getSolarPanelsStatus());
        System.out.println("Data Collected: " + satellite.getDataCollected());

        // Display command history
        System.out.println("\nCommand History:");
        for (Command command : invoker.getCommandHistory()) {
            System.out.println(command.getClass().getSimpleName());
        }
    }
}