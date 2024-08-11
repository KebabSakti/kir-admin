import { useEffect } from "react";
import { categoryApi } from "../../../data/api_loader";

export function CategoryList() {
  useEffect(() => {
    categoryApi.list({ name: "ter" }).then((categories) => {
      console.log(categories);
    });
  }, []);

  return null;
}
