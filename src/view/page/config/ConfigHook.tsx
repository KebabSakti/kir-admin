import { useEffect, useState } from "react";
import { State, Status } from "../../../common/type";
import { Config } from "../../../model/config";

export type ConfigApiType = {
  load(): void;
  state: State<Config>;
};

export function useConfigApi(): ConfigApiType {
  const [state, setState] = useState<State<Config>>({
    status: Status.idle,
  });

  useEffect(() => {
    load();
  }, []);

  function load() {
    setState({ ...state, status: Status.loading, error: undefined });
    const a = localStorage.getItem("config");
    const b = a != null ? JSON.parse(a) : undefined;

    setState({
      status: Status.complete,
      data: b,
      error: undefined,
    });
  }

  return { state, load };
}
