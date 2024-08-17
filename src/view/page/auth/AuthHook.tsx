import { useState } from "react";
import { State, Status } from "../../../common/type";
import {
  AuthAccountUpdateParam,
  AuthLoginParam,
} from "../../../feature/auth/auth_api";
import { authApi } from "../../../feature/loader";

export type AuthApiType = {
  init(): void;
  login(param: AuthLoginParam): Promise<void>;
  logout(): Promise<void>;
  update(param: AuthAccountUpdateParam): Promise<void>;
  emailResetLink(email: string): Promise<void>;
  state: State<string>;
};

export function useAuthApi(): AuthApiType {
  const [state, setState] = useState<State<string>>({
    action: "idle",
    status: Status.idle,
  });

  function init() {
    setState({ status: Status.loading, action: "init" });
    const token = authApi.init();

    setState({
      status: Status.complete,
      action: "init",
      data: token,
    });
  }

  async function login(param: AuthLoginParam): Promise<void> {
    setState({ action: "login", status: Status.loading });

    await authApi
      .login(param)
      .then((result) => {
        setState({
          status: Status.complete,
          action: "login",
          data: result,
        });
      })
      .catch((error: Error) => {
        setState({ status: Status.complete, action: "login", error: error });
      });
  }

  async function logout(): Promise<void> {
    setState({
      action: "logout",
      status: Status.loading,
    });

    authApi.logout();

    setState({
      status: Status.complete,
      action: "logout",
    });
  }

  async function update(param: AuthAccountUpdateParam): Promise<void> {
    setState({ status: Status.loading, action: "update" });

    await authApi
      .update(param)
      .then(() => {
        setState({
          status: Status.complete,
          action: "update",
        });
      })
      .catch((error: Error) => {
        setState({ status: Status.complete, action: "update", error: error });
      });
  }

  async function emailResetLink(email: string): Promise<void> {
    setState({ status: Status.loading, action: "emailResetLink" });

    await authApi
      .emailResetLink(email)
      .then((_) => {
        setState({
          status: Status.complete,
          action: "emailResetLink",
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "emailResetLink",
          error: error,
        });
      });
  }

  return { init, login, logout, emailResetLink, update, state };
}
