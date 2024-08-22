import { server } from "../../common/config";
import { Failure } from "../../common/error";
import { Axios, AxiosBase } from "../../helper/axios";
import { AuthAccountUpdateParam, AuthApi, AuthLoginParam } from "./auth_api";

export class AuthRemote implements AuthApi {
  init(): string | undefined {
    const token = localStorage.getItem("token") ?? undefined;

    return token;
  }

  async update(param: AuthAccountUpdateParam): Promise<void> {
    try {
      const response = await Axios({
        url: `${server}/auth`,
        method: "put",
        data: param,
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async login(param: AuthLoginParam): Promise<string> {
    try {
      const response = await AxiosBase({
        url: `${server}/auth`,
        method: "post",
        data: param,
      });

      localStorage.setItem("token", response.data.token);

      return response.data.token;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  logout(): void {
    localStorage.removeItem("token");
  }

  async emailResetLink(email: string): Promise<void> {
    console.log(email);
  }
}
