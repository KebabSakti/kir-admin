import { IAxios } from "../helper/axios";

export const Axios = IAxios({ withAuth: true });
export const AxiosBase = IAxios({ withAuth: false });
