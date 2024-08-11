import { NotFound, Unauthorized } from "../../common/error";
import { delay } from "../../common/utility";
import { Admin } from "../auth/admin";
import { AdminApi, AdminLoginParam, AdminUpdateParam } from "./admin_api";

export class AdminMock implements AdminApi {
  private user: Admin = {
    id: "admin",
    email: "julian.aryo1989@gmail.com",
    password: "buyung",
    created: new Date(),
    updated: new Date(),
  };

  async update(param: AdminUpdateParam): Promise<void> {
    await delay(1000);
    const userIsValid = await this.isUserIsValid(param.email, param.password);

    if (userIsValid) {
      this.user = {
        ...this.user,
        email: param.email,
        password: param.password,
      };
    }
  }

  async login(param: AdminLoginParam): Promise<string> {
    await delay(1000);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIn0.do6IimAp8mS8Nc4ZL8HMN309FiY3evm-M3bvDV4gNI4"; // { id: 'admin' }

    const userIsValid = await this.isUserIsValid(param.email, param.password);

    if (userIsValid) {
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

    if (emailIsExist) {
      console.log("Email sent");
    }

    throw new NotFound("Provided email is not valid");
  }

  private async isUserIsValid(
    email: string,
    password: string
  ): Promise<boolean> {
    await delay(1000);

    const userIsValid =
      this.user.email == email && this.user.password == password;

    return userIsValid;
  }
}
