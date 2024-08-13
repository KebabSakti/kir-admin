import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Status } from "../../../common/type";
import Breadcrumb from "../../component/Breadcrumb";
import { LoadingContainer } from "../../component/LoadingContainer";
import PageTitle from "../../component/PageTitle";
import { addPdfInitialValues, addPdfValidationSchema } from "./pdf_form";
import { PdfField, PdfSection, PdfUpload } from "./PdfComponent";
import { usePdfApi } from "./PdfHook";

export function AddPdf() {
  const pdfApi = usePdfApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      pdfApi.state.action == "create" &&
      pdfApi.state.status == Status.complete &&
      pdfApi.state.error == undefined
    ) {
      navigate("/app/setting", { replace: true });
      toast.success("Data berhasil di simpan");
    }

    if (
      pdfApi.state.action == "create" &&
      pdfApi.state.status == Status.complete &&
      pdfApi.state.error != undefined
    ) {
      toast.error(pdfApi.state.error.message);
    }
  }, [pdfApi.state]);

  return (
    <>
      <PageTitle title="Edit Data  | Uji Kir App" />
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Tambah Data" />
        <LoadingContainer loading={pdfApi.state.status == Status.loading}>
          <Formik
            enableReinitialize
            initialValues={addPdfInitialValues}
            validationSchema={addPdfValidationSchema}
            onSubmit={(values) => {
              pdfApi.create(values);
            }}
          >
            {({ setFieldValue }) => {
              return (
                <Form action="#">
                  <div className="flex flex-col gap-2">
                    <PdfSection
                      param={{
                        title: "BIODATA",
                      }}
                    >
                      <PdfField
                        param={{
                          title: "Nama",
                          type: "text",
                          as: "input",
                          name: "name",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <PdfField
                        param={{
                          title: "Level",
                          type: "text",
                          as: "input",
                          name: "level",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <PdfField
                        param={{
                          title: "Nomor",
                          type: "text",
                          as: "input",
                          name: "number",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </PdfSection>

                    <PdfSection
                      param={{
                        title: "STEMPEL DAN TANDA TANGAN",
                      }}
                    >
                      <div className="flex gap-5">
                        <PdfUpload
                          param={{
                            title: "Stempel",
                            name: "stamp",
                            setFieldValue: setFieldValue,
                          }}
                        />
                        <PdfUpload
                          param={{
                            title: "TTD",
                            name: "signature",
                            setFieldValue: setFieldValue,
                          }}
                        />
                      </div>
                    </PdfSection>

                    <div>
                      <button
                        type="submit"
                        className="p-2 w-full h-12 bg-primary rounded text-white"
                      >
                        Simpan Data
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </LoadingContainer>
      </div>
    </>
  );
}
