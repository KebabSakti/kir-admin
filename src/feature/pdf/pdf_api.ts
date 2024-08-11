import { Pdf } from "./pdf";

export type PdfUpdateParam = {
  id: string;
  name: string;
  level: string;
  number: string;
  stamp: string;
  signature: string;
};

export abstract class PdfApi {
  abstract read(id: string): Promise<Pdf | undefined>;
  abstract update(param: PdfUpdateParam): Promise<void>;
  abstract list(): Promise<Pdf[]>;
}
