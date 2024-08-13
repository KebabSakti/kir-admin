import * as Yup from "yup";

export const addPdfInitialValues: any = {
  name: "",
  level: "",
  number: "",
  stamp: "",
  signature: "",
};

export const addPdfValidationSchema = Yup.object({
  name: Yup.string().required("* Tidak boleh kosong"),
  level: Yup.string().required("* Tidak boleh kosong"),
  number: Yup.string().required("* Tidak boleh kosong"),
  stamp: Yup.mixed().required("* Diperlukan"),
  signature: Yup.mixed().required("* Diperlukan"),
});

export const editPdfInitialValues: any = addPdfInitialValues;

export const editPdfValidationSchema = addPdfValidationSchema;
