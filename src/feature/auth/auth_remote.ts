import { Failure } from "../../common/error";
import { Axios } from "../../common/instance";
import { Payload } from "../../common/type";
import { AuthAccountUpdateParam, AuthApi, AuthLoginParam } from "./auth_api";

export class AuthRemote implements AuthApi {
  async update(
    param: AuthAccountUpdateParam,
    payload?: Payload
  ): Promise<void> {
    try {
      const response = await Axios({
        url: `/auth`,
        method: "put",
        data: param,
        headers: {
          Authorization: `Bearer ${payload?.token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async login(param: AuthLoginParam): Promise<string> {
    try {
      const response = await Axios({
        url: `/auth`,
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
    throw new Error("Method not implemented.");
  }

  init(): string | undefined {
    const token = localStorage.getItem("token") ?? undefined;

    return token;
  }
}
