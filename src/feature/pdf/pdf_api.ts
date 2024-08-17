import { Payload } from "../../common/type";
import { Pdf } from "./pdf";

export type PdfCreateParam = Pdf;

export type PdfUpdateParam = Pdf;

export abstract class PdfApi {
  abstract create(param: PdfCreateParam, payload?: Payload): Promise<void>;
  abstract read(id: string, payload?: Payload): Promise<Pdf | undefined>;
  abstract update(param: PdfUpdateParam, payload?: Payload): Promise<void>;
  abstract remove(id: string, payload?: Payload): Promise<void>;
  abstract list(payload?: Payload): Promise<Pdf[]>;
}
