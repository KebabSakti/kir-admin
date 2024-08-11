import { faker } from "@faker-js/faker";
import { delay } from "../../common/utility";
import { Category } from "../../model/category";
import {
  CategoryApi,
  CreateCategoryParam,
  ListCategoryParam,
  UpdateCategoryParam,
} from "./category_api";

export class CategoryMock implements CategoryApi {
  categories: Category[] = [
    {
      id: "1",
      name: "Mobil bak terbuka",
      category: "Jenis Mobil",
      created: new Date(),
      updated: new Date(),
    },
    {
      id: "2",
      name: "Mobil bak tertutup",
      category: "Jenis Mobil",
      created: new Date(),
      updated: new Date(),
    },
  ];

  constructor(fakeDataLength: number = 0) {
    [...Array(fakeDataLength)].forEach(() => {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        category: faker.commerce.department(),
        created: new Date(),
        updated: new Date(),
      });
    });
  }

  async create(param: CreateCategoryParam): Promise<void> {
    await delay(1000);

    this.categories.push({
      ...param,
      created: new Date(),
      updated: new Date(),
    });
  }

  async read(id: string): Promise<Category | undefined> {
    await delay(1000);
    const category = this.categories.find((item) => item.id == id);

    return category;
  }

  async update(param: UpdateCategoryParam): Promise<void> {
    await delay(1000);
    const a = [...this.categories];
    const b = a.findIndex((c) => c.id == param.id);

    if (b >= 0) {
      a[b] = { ...a[b], ...param, updated: new Date() };
      this.categories = a;
    }
  }

  async delete(id: string): Promise<void> {
    await delay(1000);
    const a = [...this.categories];
    const b = a.findIndex((c) => c.id == id);

    if (b >= 0) {
      a.splice(b, 1);
      this.categories = a;
    }
  }

  async list(param?: ListCategoryParam | undefined): Promise<Category[]> {
    await delay(1000);

    let a = [...this.categories];

    if (param != undefined) {
      a = this.categories.filter((item) => {
        if (
          item.name!.indexOf(param.name!) > -1 ||
          item.category == param.category
        ) {
          return true;
        }

        return false;
      });
    }

    return a;
  }
}
