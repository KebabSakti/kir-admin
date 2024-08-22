import axios, { AxiosInstance } from "axios";
import { authApi } from "../feature/loader";

const instance = axios.create();

function IAxios(option: { withAuth: boolean }): AxiosInstance {
  if (option.withAuth) {
    instance.interceptors.request.use((config) => {
      const token = authApi.init();

      if (token != undefined) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  return instance;
}

export const Axios = IAxios({ withAuth: true });
export const AxiosBase = IAxios({ withAuth: false });
