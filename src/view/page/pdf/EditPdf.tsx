import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Status } from "../../../common/type";
import Breadcrumb from "../../component/Breadcrumb";
import { LoadingContainer } from "../../component/LoadingContainer";
import PageTitle from "../../component/PageTitle";
import { editPdfInitialValues, editPdfValidationSchema } from "./pdf_form";
import { PdfField, PdfSection, PdfUpload } from "./PdfComponent";
import { usePdfApi } from "./PdfHook";

export function EditPdf() {
  const { id } = useParams();
  const pdfApi = usePdfApi();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(editPdfInitialValues);

  useEffect(() => {
    if (pdfApi.state.status == Status.idle && pdfApi.state.data == undefined) {
      pdfApi.read(id!);
    }

    if (
      pdfApi.state.action == "read" &&
      pdfApi.state.status == Status.complete &&
      pdfApi.state.data != undefined
    ) {
      setInitialValues(pdfApi.state.data);
    }

    if (
      pdfApi.state.action == "update" &&
      pdfApi.state.status == Status.complete &&
      pdfApi.state.error == undefined
    ) {
      navigate("/app/setting", { replace: true });
      alert("Data berhasil di update");
    }

    if (
      pdfApi.state.status == Status.complete &&
      pdfApi.state.error != undefined
    ) {
      alert("Terjadi kesalahan, harap coba beberapa saat lagi");
    }
  }, [pdfApi.state]);

  return (
    <>
      <PageTitle title="Edit Data  | Uji Kir App" />
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Edit Data" />
        <LoadingContainer loading={pdfApi.state.status == Status.loading}>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={editPdfValidationSchema}
            onSubmit={(values) => {
              pdfApi.update(values);
            }}
          >
            {({ setFieldValue, values }) => {
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
                            name: "frontPic",
                            image: values.stamp,
                            setFieldValue: setFieldValue,
                          }}
                        />
                        <PdfUpload
                          param={{
                            title: "TTD",
                            name: "signature",
                            image: values.signature,
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
                        Update Data
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
