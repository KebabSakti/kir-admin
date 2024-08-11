import { AuthApi, AuthApiLoginParam } from "./auth_api";

export class AuthRemote implements AuthApi {
  login(param: AuthApiLoginParam): Promise<string> {
    throw new Error("Method not implemented.");
  }

  logout(): void {
    throw new Error("Method not implemented.");
  }
}
