import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Status } from "../../../common/type";
import Breadcrumb from "../../component/Breadcrumb";
import { LoadingContainer } from "../../component/LoadingContainer";
import PageTitle from "../../component/PageTitle";
import {
  accountUpdateFormSchema,
  accountUpdateInitialValues,
} from "./auth_form";
import { useAuthApi } from "./AuthHook";

export function AccountPage() {
  const authApi = useAuthApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authApi.state.action == "update" &&
      authApi.state.status == Status.complete &&
      authApi.state.error == undefined
    ) {
      authApi.logout();
      alert("Akun berhasil di update, harap login ulang");
    }

    if (
      authApi.state.action == "update" &&
      authApi.state.status == Status.complete &&
      authApi.state.error != undefined
    ) {
      alert("Terjadi kesalahan, harap coba beberapa saat lagi");
    }

    if (
      authApi.state.action == "logout" &&
      authApi.state.status == Status.complete
    ) {
      navigate("/", { replace: true });
    }
  }, [authApi.state]);

  return (
    <>
      <PageTitle title="Akun | Uji Kir App" />
      <Breadcrumb pageName="Akun" />
      <Formik
        initialValues={accountUpdateInitialValues}
        validationSchema={accountUpdateFormSchema}
        onSubmit={(values) => {
          authApi.update(values);
        }}
      >
        <LoadingContainer loading={authApi.state.status == Status.loading}>
          <Form>
            <div className="flex flex-col gap-2">
              <div className="rounded-sm border border-stroke bg-white shadow-default overflow-x-scroll dark:border-strokedark dark:bg-boxdark">
                <div>
                  <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <div className="font-medium text-black dark:text-white">
                      Gunakan field di bawah untuk mengganti detail login
                    </div>
                  </div>
                  <div className="p-7">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <div className="font-medium text-black dark:text-white">
                          Email
                        </div>
                        <div className="w-full">
                          <Field
                            type="email"
                            name="email"
                            placeholder="Masukkan email baru"
                            className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="font-medium text-black dark:text-white">
                          Password
                        </div>
                        <div className="w-full">
                          <Field
                            type="password"
                            name="oldPassword"
                            placeholder="Masukkan password lama"
                            className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          />
                          <ErrorMessage
                            name="oldPassword"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="font-medium text-black dark:text-white">
                          Password Baru
                        </div>
                        <div className="w-full">
                          <Field
                            type="password"
                            name="newPassword"
                            placeholder="Masukkan password baru"
                            className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          />
                          <ErrorMessage
                            name="newPassword"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="p-2 w-full h-12 bg-primary rounded text-white"
              >
                Update Akun
              </button>
            </div>
          </Form>
        </LoadingContainer>
      </Formik>
    </>
  );
}
