import { Payload } from "../../common/type";
import { Kir } from "./kir";

export type KirCreateParam = Kir;

export type KirUpdateParam = Kir;

export type KirListParam = {
  certificateNumber?: string;
  owner?: string;
  chasisNumber?: string;
};

export abstract class KirApi {
  abstract create(param: KirCreateParam, payload?: Payload): Promise<void>;
  abstract read(id: string, payload?: Payload): Promise<Kir | undefined>;
  abstract update(param: KirUpdateParam, payload?: Payload): Promise<void>;
  abstract remove(id: string, payload?: Payload): Promise<void>;
  abstract list(param?: KirListParam, payload?: Payload): Promise<Kir[]>;
  abstract print(id: string, payload?: Payload): Promise<void>;
}
