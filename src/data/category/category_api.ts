import { Category } from "./../../model/category";

export type CreateCategoryParam = Category;

export type UpdateCategoryParam = {
  id: string;
  name: string;
  category: string;
};

export type ListCategoryParam = {
  name?: string;
  category?: string;
};

export abstract class CategoryApi {
  abstract create(param: CreateCategoryParam): Promise<void>;
  abstract read(id: string): Promise<Category | undefined>;
  abstract update(param: UpdateCategoryParam): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract list(param?: ListCategoryParam | undefined): Promise<Category[]>;
}
