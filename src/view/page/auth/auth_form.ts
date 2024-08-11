import * as Yup from "yup";

export const loginFormSchema = Yup.object({
  email: Yup.string()
    .email("* Email tidak valid")
    .required("* Tidak boleh kosong"),
  password: Yup.string().required("* Tidak boleh kosong"),
});

export const recoveryFormSchema = Yup.object({
  email: Yup.string()
    .email("* Email tidak valid")
    .required("* Tidak boleh kosong"),
});

export const accountUpdateFormSchema = Yup.object({
  email: Yup.string()
    .email("* Email tidak valid")
    .required("* Tidak boleh kosong"),
  oldPassword: Yup.string().required("* Tidak boleh kosong"),
  newPassword: Yup.string().required("* Tidak boleh kosong"),
});

export const accountUpdateInitialValues = {
  email: "",
  oldPassword: "",
  newPassword: "",
};
