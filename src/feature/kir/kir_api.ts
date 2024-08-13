import { Kir } from "./kir";

export type KirCreateParam = Kir;

export type KirUpdateParam = Kir;

export type KirListParam = {
  certificateNumber?: string;
  owner?: string;
  chasisNumber?: string;
};

export abstract class KirApi {
  abstract create(param: KirCreateParam): Promise<void>;
  abstract read(id: string): Promise<Kir | undefined>;
  abstract update(param: KirUpdateParam): Promise<void>;
  abstract remove(id: string): Promise<void>;
  abstract list(param?: KirListParam): Promise<Kir[]>;
  abstract print(id: string): Promise<void>;
}
