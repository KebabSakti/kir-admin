export enum Status {
  idle = "idle",
  loading = "loading",
  complete = "complete",
}

export interface State<T> {
  status: Status;
  data?: T | Array<T> | undefined;
  error?: Error;
}

export interface ComponentProp<T> {
  prop?: T;
}
