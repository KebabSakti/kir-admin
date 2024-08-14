import { useState } from "react";
import { Payload, State, Status } from "../../../common/type";
import { Kir } from "../../../feature/kir/kir";
import {
  KirCreateParam,
  KirListParam,
  KirUpdateParam,
} from "../../../feature/kir/kir_api";
import { kirApi } from "../../../feature/loader";

export type KirApiType = {
  create(param: KirCreateParam, payload?: Payload): Promise<void>;
  read(id: string, payload?: Payload): Promise<void>;
  update(param: KirUpdateParam, payload?: Payload): Promise<void>;
  remove(id: string, payload?: Payload): Promise<void>;
  list(param?: KirListParam, payload?: Payload): Promise<void>;
  print(id: string, payload?: Payload): Promise<void>;
  state: State<Kir>;
};

export function useKirApi(): KirApiType {
  const [state, setState] = useState<State<Kir>>({
    action: "idle",
    status: Status.idle,
  });

  async function create(
    param: KirCreateParam,
    payload?: Payload
  ): Promise<void> {
    setState({ status: Status.loading, action: "create" });

    await kirApi
      .create(param, payload)
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

  async function read(id: string, payload?: Payload): Promise<void> {
    setState({ status: Status.loading, action: "read" });

    await kirApi
      .read(id, payload)
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

  async function update(
    param: KirUpdateParam,
    payload?: Payload
  ): Promise<void> {
    setState({ status: Status.loading, action: "update" });

    await kirApi
      .update(param, payload)
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

  async function remove(id: string, payload?: Payload): Promise<void> {
    setState({ status: Status.loading, action: "remove" });

    await kirApi
      .remove(id, payload)
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

  async function list(param?: KirListParam, payload?: Payload): Promise<void> {
    setState({ status: Status.loading, action: "list" });

    await kirApi
      .list(param, payload)
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

  async function print(id: string): Promise<void> {
    setState({ status: Status.loading, action: "print" });

    await kirApi
      .print(id)
      .then(() => {
        setState({
          status: Status.complete,
          action: "print",
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "print",
          error: error,
        });
      });
  }

  return { create, read, update, remove, list, print, state };
}
