import { Config } from "../../model/config";

export abstract class ConfigApi {
  abstract load(): Config|undefined;
  abstract update(param: Record<string, any>): void;
  abstract remove(key: string): void;
}
