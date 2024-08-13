import { faker } from "@faker-js/faker";
import { delay } from "../../common/utility";
import { Pdf } from "./pdf";
import { PdfApi, PdfCreateParam, PdfUpdateParam } from "./pdf_api";

export class PdfMock implements PdfApi {
  datas: Pdf[] = [
    {
      id: "1",
      name: "Ir. Danto Restyawan,MT",
      level: "Pembina Utama Madya - IV/d",
      number: "NIP 19640829 199403 1 003",
      signature:
        "https://www.pngall.com/wp-content/uploads/14/Signature-PNG-Photos.png",
      stamp:
        "https://png.pngtree.com/png-vector/20220614/ourmid/pngtree-vector-completed-stamp-illustration-background-grunge-vector-png-image_13888860.png",
      created: new Date(),
      updated: new Date(),
    },
    {
      id: "2",
      name: "TRI ADWIN CAHYONO,A.Ma.PKB",
      level: "Penguji Tingkat Tiga",
      number: "NRP 065.071.PT3.01.002",
      signature:
        "https://www.pngall.com/wp-content/uploads/14/Signature-PNG-Photos.png",
      stamp:
        "https://png.pngtree.com/png-vector/20220614/ourmid/pngtree-vector-completed-stamp-illustration-background-grunge-vector-png-image_13888860.png",
      created: new Date(),
      updated: new Date(),
    },
    {
      id: "3",
      name: "AHMADY BURHAN.S.STI,M.H",
      level: "Pembina Tingkat I-IV/b",
      number: "NIP 19800906 200012 1 001",
      signature:
        "https://www.pngall.com/wp-content/uploads/14/Signature-PNG-Photos.png",
      stamp:
        "https://png.pngtree.com/png-vector/20220614/ourmid/pngtree-vector-completed-stamp-illustration-background-grunge-vector-png-image_13888860.png",
      created: new Date(),
      updated: new Date(),
    },
  ];

  async create(param: PdfCreateParam): Promise<void> {
    await delay(1000);

    this.datas.push({
      ...param,
      id: faker.string.uuid(),
      signature:
        "https://www.pngall.com/wp-content/uploads/14/Signature-PNG-Photos.png",
      stamp:
        "https://png.pngtree.com/png-vector/20220614/ourmid/pngtree-vector-completed-stamp-illustration-background-grunge-vector-png-image_13888860.png",
      created: new Date(),
      updated: new Date(),
    });
  }

  async read(id: string): Promise<Pdf | undefined> {
    await delay(1000);
    const pdf = this.datas.find((i) => i.id == id);

    return pdf;
  }

  async update(param: PdfUpdateParam): Promise<void> {
    await delay(1000);
    const index = this.datas.findIndex((item) => item.id == param.id);

    if (index >= 0) {
      this.datas[index] = { ...param, updated: new Date() };
    }
  }

  async remove(id: string): Promise<void> {
    await delay(1000);
    const index = this.datas.findIndex((item) => item.id == id);

    if (index >= 0) {
      this.datas.splice(index, 1);
    }
  }

  async list(): Promise<Pdf[]> {
    await delay(1000);

    return this.datas;
  }
}
