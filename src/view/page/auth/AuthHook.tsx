import { useState } from "react";
import { State, Status } from "../../../common/type";
import { AuthLoginParam } from "../../../feature/auth/auth_api";
import { authApi } from "../../../feature/loader";

export type AuthApiType = {
  init(): void;
  login(param: AuthLoginParam): Promise<void>;
  logout(): Promise<void>;
  emailResetLink(email: string): Promise<void>;
  state: State<string>;
};

export function useAuthApi(): AuthApiType {
  const [state, setState] = useState<State<string>>({
    status: Status.idle,
  });

  function init() {
    setState({ status: Status.loading });
    const token = localStorage.getItem("token") ?? undefined;

    setState({
      status: Status.complete,
      data: token,
    });
  }

  async function login(param: AuthLoginParam): Promise<void> {
    setState({ status: Status.loading });

    await authApi
      .login(param)
      .then((result) => {
        setState({
          status: Status.complete,
          data: result,
        });
      })
      .catch((error: Error) => {
        setState({ status: Status.complete, error: error });
      });
  }

  async function logout(): Promise<void> {
    setState({ status: Status.loading });
    authApi.logout();

    setState({
      status: Status.complete,
    });
  }

  async function emailResetLink(email: string): Promise<void> {
    setState({ status: Status.loading });

    await authApi
      .emailResetLink(email)
      .then((_) => {
        setState({
          status: Status.complete,
        });
      })
      .catch((error: Error) => {
        setState({ status: Status.complete, error: error });
      });
  }

  return { init, login, logout, emailResetLink, state };
}
