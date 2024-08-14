import { Failure } from "../../common/error";
import { Axios } from "../../common/instance";
import { Payload } from "../../common/type";
import { Kir } from "./kir";
import {
  KirApi,
  KirCreateParam,
  KirListParam,
  KirUpdateParam,
} from "./kir_api";

export class KirRemote implements KirApi {
  async create(param: KirCreateParam, payload?: Payload): Promise<void> {
    try {
      await Axios({
        url: "/admin/kir",
        method: "post",
        data: param,
        headers: {
          Authorization: `Bearer ${payload?.token}`,
        },
      });
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async read(id: string, payload?: Payload): Promise<Kir | undefined> {
    try {
      const response = await Axios({
        url: `/admin/kir/${id}/read`,
        method: "get",
        headers: {
          Authorization: `Bearer ${payload?.token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async update(param: KirUpdateParam, payload?: Payload): Promise<void> {
    try {
      const response = await Axios({
        url: `/admin/kir/`,
        method: "put",
        data: param,
        headers: {
          Authorization: `Bearer ${payload?.token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async remove(id: string, payload?: Payload): Promise<void> {
    try {
      const response = await Axios({
        url: `/admin/kir/`,
        method: "delete",
        data: id,
        headers: {
          Authorization: `Bearer ${payload?.token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async list(param?: KirListParam, payload?: Payload): Promise<Kir[]> {
    try {
      const response = await Axios({
        url: `/admin/kir/`,
        method: "get",
        params: param,
        headers: {
          Authorization: `Bearer ${payload?.token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async print(id: string, payload?: Payload): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
