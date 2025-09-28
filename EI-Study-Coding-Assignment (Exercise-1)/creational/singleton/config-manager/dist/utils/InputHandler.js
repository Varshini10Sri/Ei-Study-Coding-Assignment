"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHandler = void 0;
const readline = __importStar(require("readline"));
class InputHandler {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    async promptForAction() {
        console.log("\n=== Configuration Manager ===");
        console.log("1. Set a configuration");
        console.log("2. Get a configuration");
        console.log("3. List all configurations");
        console.log("4. Delete a configuration");
        console.log("5. Clear all configurations");
        console.log("6. Exit");
        const choice = await this.promptInput("Select an option (1-6): ");
        return choice.trim();
    }
    async promptForConfigEntry() {
        const key = await this.promptInput("Enter configuration key: ");
        if (!key)
            return null;
        const valueStr = await this.promptInput("Enter configuration value: ");
        if (!valueStr)
            return null;
        // Try to determine the type
        let value = valueStr;
        let type = "string";
        if (valueStr.toLowerCase() === "true" ||
            valueStr.toLowerCase() === "false") {
            value = valueStr.toLowerCase() === "true";
            type = "boolean";
        }
        else if (!isNaN(Number(valueStr))) {
            value = Number(valueStr);
            type = "number";
        }
        return { key, value, type };
    }
    async promptForKey() {
        return await this.promptInput("Enter configuration key: ");
    }
    async promptInput(question) {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer.trim());
            });
        });
    }
    async promptContinue() {
        const answer = await this.promptInput("Continue? (y/n): ");
        return answer.toLowerCase() === "y";
    }
    close() {
        this.rl.close();
    }
}
exports.InputHandler = InputHandler;
