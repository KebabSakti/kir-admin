import axios from "axios";
import { server } from "./config";

export const Axios = axios.create({
  baseURL: server,
  timeout: 1000,
});
