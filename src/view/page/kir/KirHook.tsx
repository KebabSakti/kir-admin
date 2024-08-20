import { useState } from "react";
import { State, Status } from "../../../common/type";
import { Kir } from "../../../feature/kir/kir";
import {
  KirCreateParam,
  KirListParam,
  KirUpdateParam,
} from "../../../feature/kir/kir_api";
import { kirApi } from "../../../feature/loader";

export type KirApiType = {
  create(param: KirCreateParam): Promise<void>;
  read(id: string): Promise<void>;
  update(param: KirUpdateParam): Promise<void>;
  remove(id: string): Promise<void>;
  list(param?: KirListParam): Promise<void>;
  state: State<Kir>;
};

export function useKirApi(): KirApiType {
  const [state, setState] = useState<State<Kir>>({
    action: "idle",
    status: Status.idle,
  });

  async function create(param: KirCreateParam): Promise<void> {
    setState({ status: Status.loading, action: "create" });

    await kirApi
      .create(param)
      .then(() => {
        setState({
          status: Status.complete,
          action: "create",
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "create",
          error: error,
        });
      });
  }

  async function read(id: string): Promise<void> {
    setState({ status: Status.loading, action: "read" });

    await kirApi
      .read(id)
      .then((result) => {
        setState({
          status: Status.complete,
          action: "read",
          data: result,
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "read",
          error: error,
        });
      });
  }

  async function update(param: KirUpdateParam): Promise<void> {
    setState({ status: Status.loading, action: "update" });

    await kirApi
      .update(param)
      .then(() => {
        setState({
          status: Status.complete,
          action: "update",
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "update",
          error: error,
        });
      });
  }

  async function remove(id: string): Promise<void> {
    setState({ status: Status.loading, action: "remove" });

    await kirApi
      .remove(id)
      .then(() => {
        setState({
          status: Status.complete,
          action: "remove",
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "remove",
          error: error,
        });
      });
  }

  async function list(param?: KirListParam): Promise<void> {
    setState({ status: Status.loading, action: "list" });

    await kirApi
      .list(param)
      .then((result) => {
        setState({
          status: Status.complete,
          action: "list",
          data: result,
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "list",
          error: error,
        });
      });
  }

  return { create, read, update, remove, list, state };
}
