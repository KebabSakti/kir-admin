import { Pdf } from "./pdf";

export type PdfCreateParam = Pdf;

export type PdfUpdateParam = Pdf;

export abstract class PdfApi {
  abstract create(param: PdfCreateParam): Promise<void>;
  abstract read(id: string): Promise<Pdf | undefined>;
  abstract update(param: PdfUpdateParam): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract list(): Promise<Pdf[]>;
}
