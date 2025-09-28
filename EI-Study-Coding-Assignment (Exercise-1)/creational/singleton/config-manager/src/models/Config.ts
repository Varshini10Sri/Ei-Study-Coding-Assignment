export interface Config {
  [key: string]: string | number | boolean;
}

export interface ConfigEntry {
  key: string;
  value: string | number | boolean;
  type: "string" | "number" | "boolean";
}
