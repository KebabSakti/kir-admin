import { AuthAccountUpdateParam, AuthApi, AuthLoginParam } from "./auth_api";

export class AuthRemote implements AuthApi {
  update(param: AuthAccountUpdateParam): Promise<void> {
    throw new Error("Method not implemented.");
  }

  login(param: AuthLoginParam): Promise<string> {
    throw new Error("Method not implemented.");
  }

  logout(): void {
    throw new Error("Method not implemented.");
  }

  emailResetLink(email: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
