import { server } from "../../common/config";
import { Failure } from "../../common/error";
import { Axios } from "../../common/instance";
import { Pdf } from "./pdf";
import { PdfApi, PdfCreateParam, PdfUpdateParam } from "./pdf_api";

export class PdfRemote implements PdfApi {
  async create(param: PdfCreateParam): Promise<void> {
    try {
      const parameters: any = param;
      const formData = new FormData();
      formData.append("file", param.stamp as File);
      formData.append("file", param.signature as File);

      for (const key in parameters) {
        formData.append(key, parameters[key]);
      }

      await Axios({
        url: `${server}/admin/pdf`,
        method: "post",
        data: formData,
      });
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async read(id: string): Promise<Pdf | undefined> {
    try {
      const response = await Axios({
        url: `${server}/admin/pdf/${id}/read`,
        method: "get",
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async update(param: PdfUpdateParam): Promise<void> {
    try {
      const response = await Axios({
        url: `${server}/admin/pdf/`,
        method: "put",
        data: param,
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const response = await Axios({
        url: `${server}/admin/pdf/`,
        method: "delete",
        data: id,
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }

  async list(): Promise<Pdf[]> {
    try {
      const response = await Axios({
        url: `${server}/admin/pdf/`,
        method: "get",
      });

      return response.data;
    } catch (error: any) {
      throw Failure(error.response.status, error.response.data);
    }
  }
}
