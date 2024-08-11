import * as Yup from "yup";

export const editPdfInitialValues: any = {
  name: "",
  level: "",
  number: "",
  stamp: "",
  signature: "",
};

export const editPdfValidationSchema = Yup.object({
  name: Yup.string().required("* Tidak boleh kosong"),
  level: Yup.string().required("* Tidak boleh kosong"),
  number: Yup.string().required("* Tidak boleh kosong"),
  stamp: Yup.mixed().required("* Diperlukan"),
  signature: Yup.mixed().required("* Diperlukan"),
});
