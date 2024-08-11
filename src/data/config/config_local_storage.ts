import { Config } from "./../../model/config";
import { ConfigApi } from "./config_api";

export class ConfigLocalStorage implements ConfigApi {
  load(): Config | undefined {
    const storedConfig = localStorage.getItem("config");

    if (storedConfig) {
      const config = JSON.parse(storedConfig) as Config;

      return config;
    }
  }

  update(param: Record<string, any>): void {
    const storedConfig = localStorage.getItem("config");

    if (storedConfig) {
      const a = JSON.parse(storedConfig);
      const b = { ...a, ...param };

      localStorage.setItem("config", JSON.stringify(b));
    }
  }

  remove(key: string): void {
    const storedConfig = localStorage.getItem("config");

    if (storedConfig) {
      const a = JSON.parse(storedConfig);
      delete a[key];

      localStorage.setItem("config", JSON.stringify(a));
    }
  }
}
