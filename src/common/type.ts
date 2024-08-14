export enum Status {
  idle = "idle",
  loading = "loading",
  complete = "complete",
}

export interface State<T> {
  status: Status;
  action: string;
  data?: T | Array<T> | undefined;
  error?: Error;
}

export interface ComponentProp<T> {
  prop?: T;
}

export type Payload = {
  token?: string;
  pagination?: {
    cursor: number;
    take: number;
  };
};

export type RequestResult<T> = {
  message?: string;
  data?: T | Array<T> | undefined;
};
