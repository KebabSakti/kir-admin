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
  print(id: string): Promise<void>;
  state: State<Kir>;
};

export function useKirApi(): KirApiType {
  const [state, setState] = useState<State<Kir>>({
    status: Status.idle,
  });

  async function create(param: KirCreateParam): Promise<void> {
    setState({ status: Status.loading });

    await kirApi
      .create(param)
      .then(() => {
        setState({
          status: Status.complete,
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          error: error,
        });
      });
  }

  async function read(id: string): Promise<void> {
    setState({ ...state, status: Status.loading, error: undefined });

    await kirApi
      .read(id)
      .then((result) => {
        setState({
          ...state,
          status: Status.complete,
          data: result,
          error: undefined,
        });
      })
      .catch((error: Error) => {
        setState({
          ...state,
          status: Status.complete,
          error: error,
        });
      });
  }

  async function update(param: KirUpdateParam): Promise<void> {
    setState({ ...state, status: Status.loading, error: undefined });

    await kirApi
      .update(param)
      .then(() => {
        setState({
          ...state,
          status: Status.complete,
          error: undefined,
        });
      })
      .catch((error: Error) => {
        setState({
          ...state,
          status: Status.complete,
          error: error,
        });
      });
  }

  async function remove(id: string): Promise<void> {
    setState({ ...state, status: Status.loading, error: undefined });

    await kirApi
      .remove(id)
      .then(() => {
        setState({
          ...state,
          status: Status.complete,
          error: undefined,
        });
      })
      .catch((error: Error) => {
        setState({
          ...state,
          status: Status.complete,
          error: error,
        });
      });
  }

  async function list(param?: KirListParam): Promise<void> {
    setState({ status: Status.loading });

    await kirApi
      .list(param)
      .then((result) => {
        setState({
          status: Status.complete,
          data: result,
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          error: error,
        });
      });
  }

  async function print(id: string): Promise<void> {
    setState({ ...state, status: Status.loading, error: undefined });

    await kirApi
      .print(id)
      .then(() => {
        setState({
          ...state,
          status: Status.complete,
          error: undefined,
        });
      })
      .catch((error: Error) => {
        setState({
          ...state,
          status: Status.complete,
          error: error,
        });
      });
  }

  return { create, read, update, remove, list, print, state };
}
