import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { delay } from "../../common/utility";
import { Kir } from "./kir";
import {
  KirApi,
  KirCreateParam,
  KirListParam,
  KirUpdateParam,
} from "./kir_api";

export class KirMock implements KirApi {
  datas: Kir[] = [];

  constructor(fakeDataLength: number = 0) {
    [...Array(fakeDataLength)].forEach(() => {
      const certificateNumber = faker.string.numeric({
        length: { min: 9, max: 9 },
      });

      this.datas.push({
        id: faker.string.uuid(),
        certificateNumber: certificateNumber,
        director: faker.person.fullName(),
        directorLevel: faker.word.words(2),
        directorNip: faker.string.numeric({ length: { min: 9, max: 9 } }),
        directorStamp: faker.image.url({ width: 50, height: 50 }),
        directorSignature: faker.image.url({ width: 50, height: 50 }),
        owner: faker.company.name(),
        address: faker.location.streetAddress(),
        registrationDate: new Date(),
        registrationNumber: faker.string.numeric({
          length: { min: 9, max: 9 },
        }),
        chasisNumber: faker.string.numeric({ length: { min: 9, max: 9 } }),
        engineNumber: faker.string.numeric({ length: { min: 9, max: 9 } }),
        inspectionNumber: faker.string.numeric({ length: { min: 9, max: 9 } }),
        inspectorStamp: faker.image.url({ width: 50, height: 50 }),
        inspectorSignature: faker.image.url({ width: 50, height: 50 }),
        frontPic: faker.image.url(),
        backPic: faker.image.url(),
        rightPic: faker.image.url(),
        leftPic: faker.image.url(),
        vehicleType: faker.vehicle.type(),
        vehicleBrand: faker.vehicle.manufacturer(),
        yearManufacture: "2019",
        axleConfiguration: "10",
        fuel: faker.science.unit().name,
        engineCapacity: faker.string.numeric({ length: { min: 6, max: 6 } }),
        enginePower: faker.string.numeric({ length: { min: 6, max: 6 } }),
        tyreSize: faker.string.numeric({ length: { min: 2, max: 2 } }),
        curbWeight: faker.string.numeric({ length: { min: 2, max: 2 } }),
        length: faker.string.numeric({ length: { min: 2, max: 2 } }),
        width: faker.string.numeric({ length: { min: 2, max: 2 } }),
        height: faker.string.numeric({ length: { min: 2, max: 2 } }),
        front: faker.string.numeric({ length: { min: 2, max: 2 } }),
        back: faker.string.numeric({ length: { min: 2, max: 2 } }),
        sumbu1: faker.string.numeric({ length: { min: 2, max: 2 } }),
        sumbu2: faker.string.numeric({ length: { min: 2, max: 2 } }),
        sumbu3: faker.string.numeric({ length: { min: 2, max: 2 } }),
        dimension: faker.string.numeric({ length: { min: 2, max: 2 } }),
        jbbJbkb: faker.string.numeric({ length: { min: 2, max: 2 } }),
        jbiJbki: faker.string.numeric({ length: { min: 2, max: 2 } }),
        payload: faker.string.numeric({ length: { min: 2, max: 2 } }),
        classPermit: faker.word.words(2),
        brake1: faker.string.numeric({ length: { min: 2, max: 2 } }),
        brake2: faker.string.numeric({ length: { min: 2, max: 2 } }),
        brake3: faker.string.numeric({ length: { min: 2, max: 2 } }),
        brake4: faker.string.numeric({ length: { min: 2, max: 2 } }),
        brake5: faker.string.numeric({ length: { min: 2, max: 2 } }),
        headLamp1: faker.string.numeric({ length: { min: 2, max: 2 } }),
        headLamp2: faker.string.numeric({ length: { min: 2, max: 2 } }),
        headLamp3: faker.string.numeric({ length: { min: 2, max: 2 } }),
        headLamp4: faker.string.numeric({ length: { min: 2, max: 2 } }),
        inspectionResult: faker.datatype.boolean()
          ? "TIDAK LULUS UJI BERKALA"
          : "LULUS UJI BERKALA",
        expiryDate: dayjs().add(6, "month").toDate(),
        inspector: faker.person.fullName(),
        inspectorLevel: faker.word.words(2),
        inspectorNumber: faker.string.numeric({ length: { min: 9, max: 9 } }),
        agency: faker.company.name(),
        agencyLevel: faker.word.words(2),
        agencyNumber: faker.string.numeric({ length: { min: 9, max: 9 } }),
        agencyStamp: faker.image.url({ width: 50, height: 50 }),
        agencySignature: faker.image.url({ width: 50, height: 50 }),
        qr: `http://192.168.10.32/certificate/${certificateNumber}`,
        created: new Date(),
        updated: new Date(),
      });
    });
  }

  async create(param: KirCreateParam): Promise<void> {
    await delay(1000);

    const certificateNumber = faker.string.numeric({
      length: { min: 9, max: 9 },
    });

    this.datas.push({
      ...param,
      id: faker.string.uuid(),
      certificateNumber: certificateNumber,
      director: faker.person.fullName(),
      directorLevel: faker.word.words(2),
      directorNip: faker.string.numeric({ length: { min: 9, max: 9 } }),
      directorStamp: faker.image.url({ width: 50, height: 50 }),
      directorSignature: faker.image.url({ width: 50, height: 50 }),
      registrationDate: new Date(),
      inspectionResult: faker.datatype.boolean()
        ? "TIDAK LULUS UJI BERKALA"
        : "LULUS UJI BERKALA",
      expiryDate: dayjs().add(6, "month").toDate(),
      inspector: faker.person.fullName(),
      inspectorLevel: faker.word.words(2),
      inspectorNumber: faker.string.numeric({ length: { min: 9, max: 9 } }),
      inspectorStamp: faker.image.url({ width: 50, height: 50 }),
      inspectorSignature: faker.image.url({ width: 50, height: 50 }),
      agency: faker.company.name(),
      agencyLevel: faker.word.words(2),
      agencyNumber: faker.string.numeric({ length: { min: 9, max: 9 } }),
      agencyStamp: faker.image.url({ width: 50, height: 50 }),
      agencySignature: faker.image.url({ width: 50, height: 50 }),
      qr: `http://192.168.10.32/certificate/${certificateNumber}`,
      created: new Date(),
      updated: new Date(),
    });
  }

  async read(id: string): Promise<Kir | undefined> {
    await delay(1000);
    const kir = this.datas.find((i) => i.id == id);

    return kir;
  }

  async update(param: KirUpdateParam): Promise<void> {
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

  async list(param?: KirListParam): Promise<Kir[]> {
    await delay(1000);
    let result = [...this.datas];

    if (param != undefined) {
      result = this.datas.filter((item) => {
        if (
          item.owner!.indexOf(param.owner!) > -1 ||
          item.certificateNumber == param.certificateNumber
        ) {
          return true;
        }

        return false;
      });
    }

    return result;
  }

  async print(id: string): Promise<void> {
    await delay(1000);
    const kir = this.datas.find((i) => i.id == id);

    if (kir != undefined) {
      console.log("EXPORTED");
    }
  }
}
