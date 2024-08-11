import * as Yup from "yup";

export const loginFormSchema = Yup.object({
  email: Yup.string()
    .email("Email is not valid")
    .required("Field cannot be empty"),
  password: Yup.string().required("Field cannot be empty"),
});

export const recoveryFormSchema = Yup.object({
  email: Yup.string()
    .email("Email is not valid")
    .required("Field cannot be empty"),
});
