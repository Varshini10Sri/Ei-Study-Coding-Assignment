"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
class ConfigManager {
    constructor() {
        this.config = {};
    }
    static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }
    set(key, value) {
        this.config[key] = value;
        console.log(`✅ Setting saved: ${key} = ${value}`);
    }
    get(key) {
        return this.config[key];
    }
    getAll() {
        return { ...this.config };
    }
    delete(key) {
        if (key in this.config) {
            delete this.config[key];
            console.log(`✅ Setting deleted: ${key}`);
            return true;
        }
        return false;
    }
    clear() {
        this.config = {};
        console.log("✅ All settings cleared");
    }
    printAll() {
        console.log("\n=== Current Configuration ===");
        if (Object.keys(this.config).length === 0) {
            console.log("No configuration settings found");
            return;
        }
        Object.entries(this.config).forEach(([key, value]) => {
            console.log(`${key}: ${value} (${typeof value})`);
        });
        console.log("============================\n");
    }
}
exports.ConfigManager = ConfigManager;
