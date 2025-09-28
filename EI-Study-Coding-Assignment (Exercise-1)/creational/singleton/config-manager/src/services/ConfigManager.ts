import { Config } from "../models/Config";

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Config = {};

  private constructor() {}

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public set(key: string, value: string | number | boolean): void {
    this.config[key] = value;
    console.log(`✅ Setting saved: ${key} = ${value}`);
  }

  public get(key: string): string | number | boolean | undefined {
    return this.config[key];
  }

  public getAll(): Config {
    return { ...this.config };
  }

  public delete(key: string): boolean {
    if (key in this.config) {
      delete this.config[key];
      console.log(`✅ Setting deleted: ${key}`);
      return true;
    }
    return false;
  }

  public clear(): void {
    this.config = {};
    console.log("✅ All settings cleared");
  }

  public printAll(): void {
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
