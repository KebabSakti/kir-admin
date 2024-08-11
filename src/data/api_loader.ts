import { CategoryApi } from "./category/category_api";
import { CategoryMock } from "./category/category_mock";
import { ConfigApi } from "./config/config_api";
import { ConfigLocalStorage } from "./config/config_local_storage";

export const configApi: ConfigApi = new ConfigLocalStorage();
export const categoryApi: CategoryApi = new CategoryMock(10);
