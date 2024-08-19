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
  abstract update(param: AuthAccountUpdateParam): Promise<void>;
  abstract login(param: AuthLoginParam): Promise<string>;
  abstract logout(): void;
  abstract emailResetLink(email: string): Promise<void>;
  abstract init(): string | undefined;
}
