import { NotFound, Unauthorized } from "../../common/error";
import { delay } from "../../common/utility";
import { Admin } from "./admin";
import { AuthAccountUpdateParam, AuthApi, AuthLoginParam } from "./auth_api";

export class AuthMock implements AuthApi {
  init(): string {
    throw new Error("Method not implemented.");
  }
  private user: Admin = {
    id: "admin",
    email: "julian.aryo1989@gmail.com",
    password: "buyung",
    created: new Date(),
    updated: new Date(),
  };

  async update(param: AuthAccountUpdateParam): Promise<void> {
    await delay(1000);
    const userIsValid = await this.isUserValid(param.email, param.oldPassword);

    if (userIsValid) {
      this.user = {
        ...this.user,
        email: param.email,
        password: param.newPassword,
      };
    }
  }

  async login(param: AuthLoginParam): Promise<string> {
    await delay(1000);
    const userIsValid = await this.isUserValid(param.email, param.password);

    if (userIsValid) {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIn0.do6IimAp8mS8Nc4ZL8HMN309FiY3evm-M3bvDV4gNI4"; // { id: 'admin' }

      localStorage.setItem("token", token);

      return token;
    }

    throw new Unauthorized("Provided credential is not valid");
  }

  async logout(): Promise<void> {
    localStorage.removeItem("token");
  }

  async emailResetLink(email: string): Promise<void> {
    await delay(1000);
    const emailIsExist = this.user.email == email;

    if (!emailIsExist) {
      throw new NotFound("Provided email is not valid");
    }

    console.log("Email sent");
  }

  private async isUserValid(email: string, password: string): Promise<boolean> {
    await delay(1000);

    const userIsValid =
      this.user.email == email && this.user.password == password;

    return userIsValid;
  }
}
