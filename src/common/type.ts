export enum Status {
  idle = "idle",
  loading = "loading",
  complete = "complete",
}

export interface State<T> {
  status: Status;
  action?: string;
  data?: T | Array<T> | undefined;
  error?: Error;
}

export interface ComponentProp<T> {
  prop?: T;
}
