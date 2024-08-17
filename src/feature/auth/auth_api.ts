import { Payload } from "../../common/type";

export type AuthAccountUpdateParam = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export type AuthLoginParam = {
  email: string;
  password: string;
};

export abstract class AuthApi {
  abstract update(
    param: AuthAccountUpdateParam,
    payload?: Payload
  ): Promise<void>;
  abstract login(param: AuthLoginParam, payload?: Payload): Promise<string>;
  abstract logout(): void;
  abstract init(): string|undefined;
  abstract emailResetLink(email: string, payload?: Payload): Promise<void>;
}
