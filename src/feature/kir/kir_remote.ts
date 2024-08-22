import { server } from "../../common/config";
import { Failure } from "../../common/error";
import { Axios } from "../../helper/axios";
import { Kir } from "./kir";
import {
  KirApi,
  KirCreateParam,
  KirListParam,
  KirUpdateParam,
} from "./kir_api";

export class KirRemote implements KirApi {
  async create(param: KirCreateParam): Promise<void> {
    try {
      const formData = new FormData();
      const parameters: any = param;

      for (const key in parameters) {
        formData.append(key, parameters[key]);
      }

      await Axios({
        url: `${server}/admin/kir`,
        method: "post",
        data: formData,
      });
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async read(id: string): Promise<Kir | undefined> {
    try {
      const response = await Axios({
        url: `${server}/admin/kir/${id}/read`,
        method: "get",
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async update(param: KirUpdateParam): Promise<void> {
    try {
      const formData = new FormData();
      const parameters: any = param;

      for (const key in parameters) {
        formData.append(key, parameters[key]);
      }

      await Axios({
        url: `${server}/admin/kir/`,
        method: "put",
        data: formData,
      });
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const response = await Axios({
        url: `${server}/admin/kir/`,
        method: "delete",
        data: { id: id },
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async list(param?: KirListParam): Promise<Kir[]> {
    try {
      const response = await Axios({
        url: `${server}/admin/kir/`,
        method: "get",
        params: param,
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }
}
