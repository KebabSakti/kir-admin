import { Failure } from "../../common/error";
import { Axios } from "../../common/instance";
import { Payload } from "../../common/type";
import { Pdf } from "./pdf";
import { PdfApi, PdfCreateParam, PdfUpdateParam } from "./pdf_api";

export class PdfRemote implements PdfApi {
  async create(param: PdfCreateParam, payload?: Payload): Promise<void> {
    try {
      await Axios({
        url: "/admin/pdf",
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

  async read(id: string, payload?: Payload): Promise<Pdf | undefined> {
    try {
      const response = await Axios({
        url: `/admin/pdf/${id}/read`,
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

  async update(param: PdfUpdateParam, payload?: Payload): Promise<void> {
    try {
      const response = await Axios({
        url: `/admin/pdf/`,
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
        url: `/admin/pdf/`,
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

  async list(payload?: Payload): Promise<Pdf[]> {
    try {
      const response = await Axios({
        url: `/admin/pdf/`,
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
}
