import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { Status } from "../../../common/type";
import Breadcrumb from "../../component/Breadcrumb";
import { LoadingContainer } from "../../component/LoadingContainer";
import PageTitle from "../../component/PageTitle";
import { AddKirField, AddKirSection, AddKirUpload } from "./AddKirComponent";
import { addKirInitialValues, addKirValidationSchema } from "./kir_form";
import { useKirApi } from "./KirHook";
import { useNavigate } from "react-router-dom";

export function AddKir() {
  const kirApi = useKirApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      kirApi.state.status == Status.complete &&
      kirApi.state.data == undefined
    ) {
      kirApi.list();
    }
  }, [kirApi.state]);

  return (
    <>
      <PageTitle title="Tambah Data Kir | Uji Kir App" />
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Tambah Data Kir" />
        <LoadingContainer loading={kirApi.state.status === Status.loading}>
          <Formik
            initialValues={addKirInitialValues}
            validationSchema={addKirValidationSchema}
            onSubmit={async (values) => {
              await kirApi.create(values);
              navigate("/app/kir", { replace: true });
            }}
          >
            {({ setFieldValue }) => {
              return (
                <Form action="#">
                  <div className="flex flex-col gap-2">
                    <AddKirSection
                      param={{
                        title: "IDENTITAS PEMILIK KENDARAAN BERMOTOR",
                        subtitle: "VEHICLE OWNER IDENTIFICATION",
                      }}
                    >
                      <AddKirField
                        param={{
                          title: "Nama pemilik",
                          subtitle: "Owner's name",
                          type: "text",
                          as: "input",
                          name: "owner",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Alamat pemilik",
                          subtitle: "Owner's address",
                          type: "text",
                          as: "textarea",
                          name: "address",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </AddKirSection>

                    <AddKirSection
                      param={{
                        title: "IDENTITAS KENDARAAN BERMOTOR",
                        subtitle: "VEHICLE IDENTIFICATION",
                      }}
                    >
                      <AddKirField
                        param={{
                          title:
                            "Nomor dan tanggal sertifikat registrasi uji tipe",
                          subtitle:
                            "Number and date of vehicle type approved registration certificate",
                          type: "text",
                          as: "input",
                          name: "registrationDate",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Nomor registrasi kendaraan",
                          subtitle: "Vehicle registration number",
                          type: "text",
                          as: "input",
                          name: "registrationNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Nomor rangka kendaraan",
                          subtitle: "Chasis number",
                          type: "text",
                          as: "input",
                          name: "chasisNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Nomor motor penggerak",
                          subtitle: "Engine number",
                          type: "text",
                          as: "input",
                          name: "engineNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Nomor uji kendaraan",
                          subtitle: "Vehicle inspection number",
                          type: "text",
                          as: "input",
                          name: "inspectionNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </AddKirSection>

                    <AddKirSection
                      param={{
                        title: "FOTO BERWARNA KENDARAAN",
                        subtitle: "Vehicle colored photo",
                      }}
                    >
                      <div className="flex justify-between">
                        <AddKirUpload
                          param={{
                            title: "Foto Depan",
                            subtitle: "Front Picture",
                            name: "frontPicFile",
                            setFieldValue: setFieldValue,
                          }}
                        />
                        <AddKirUpload
                          param={{
                            title: "Foto Belakang",
                            subtitle: "Back Picture",
                            name: "backPicFile",
                            setFieldValue: setFieldValue,
                          }}
                        />
                        <AddKirUpload
                          param={{
                            title: "Foto Kanan",
                            subtitle: "Right Picture",
                            name: "rightPicFile",
                            setFieldValue: setFieldValue,
                          }}
                        />
                        <AddKirUpload
                          param={{
                            title: "Foto Kiri",
                            subtitle: "Left Picture",
                            name: "leftPicFile",
                            setFieldValue: setFieldValue,
                          }}
                        />
                      </div>
                    </AddKirSection>

                    <AddKirSection
                      param={{
                        title: "SPESIFIKASI TEKNIS KENDARAAN",
                        subtitle: "VEHICLE TECHNICAL SPESIFICATIONS",
                      }}
                    >
                      <AddKirField
                        param={{
                          title: "Jenis",
                          subtitle: "Purpose of vehicle",
                          type: "text",
                          as: "input",
                          name: "vehicleType",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Merk/tipe",
                          subtitle: "Brand/type",
                          type: "text",
                          as: "input",
                          name: "vehicleBrand",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Tahun pembuatan/perakitan",
                          subtitle: "Year manufactured/assembled",
                          type: "text",
                          as: "input",
                          name: "yearManufacture",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Bahan bakar/sumber energi",
                          subtitle: "Fuel/energy source",
                          type: "text",
                          as: "input",
                          name: "fuel",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Isi silinder",
                          subtitle: "Engine capacity",
                          type: "text",
                          as: "input",
                          name: "engineCapacity",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Daya motor",
                          subtitle: "Engine power",
                          type: "text",
                          as: "input",
                          name: "enginePower",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Ukuran ban",
                          subtitle: "Tyre size",
                          type: "text",
                          as: "input",
                          name: "tyreSize",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Konfigurasi sumbu",
                          subtitle: "Axle configuration",
                          type: "text",
                          as: "input",
                          name: "axleConfiguration",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Berat kosong kendaraan",
                          subtitle: "Curb weight",
                          type: "text",
                          as: "input",
                          name: "curbWeight",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <div className="text-[16px] font-semibold text-black dark:text-white">
                        Dimensi utama kendaraan bermotor (Vehicle main
                        dimension)
                      </div>
                      <AddKirField
                        param={{
                          title: "Panjang",
                          subtitle: "Length",
                          type: "text",
                          as: "input",
                          name: "length",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Lebar",
                          subtitle: "Width",
                          type: "text",
                          as: "input",
                          name: "width",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Tinggi",
                          subtitle: "Height",
                          type: "text",
                          as: "input",
                          name: "height",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Julur depan",
                          subtitle: "Front everhang",
                          type: "text",
                          as: "input",
                          name: "front",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Julur belakang",
                          subtitle: "Back overhang",
                          type: "text",
                          as: "input",
                          name: "back",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <div className="text-[16px] font-semibold text-black dark:text-white">
                        Jarak sumbu (Wheel base)
                      </div>
                      <AddKirField
                        param={{
                          title: "Sumbu I-II",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "sumbu1",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Sumbu II-III",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "sumbu2",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Sumbu III-IV",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "sumbu3",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Dimensi bak muatan/tangki",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "dimension",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <div className="text-[16px] font-semibold text-black dark:text-white">
                        Dimension of cargo tub (length x width x height)
                      </div>
                      <AddKirField
                        param={{
                          title: "JBB/JBKB",
                          subtitle: "GVW/GVCW",
                          type: "text",
                          as: "input",
                          name: "jbbJbkb",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "JBI/JBKI",
                          subtitle: "PVW/PVCW",
                          type: "text",
                          as: "input",
                          name: "jbiJbki",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Daya angkut (orang/kg)",
                          subtitle: "Payload (person(s)/kg(s))",
                          type: "text",
                          as: "input",
                          name: "payload",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <AddKirField
                        param={{
                          title: "Kelas jalan terendah yang boleh dilalui",
                          subtitle: "Lowest class road permitted",
                          type: "text",
                          as: "input",
                          name: "classPermit",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </AddKirSection>

                    <div className="col-span-5 xl:col-span-3">
                      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="p-7">
                          <table className="w-full table-fixed">
                            <thead className="border-b border-stroke">
                              <tr>
                                <th className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-black dark:text-white">
                                      Item Uji
                                    </div>
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Testing
                                    </div>
                                  </div>
                                </th>
                                <th className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-black dark:text-white">
                                      Ambang Batas
                                    </div>
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Threshold
                                    </div>
                                  </div>
                                </th>
                                <th className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-black dark:text-white">
                                      Hasil Uji
                                    </div>
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Test Result
                                    </div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-sm text-black dark:text-white">
                                      Rem Utama
                                    </div>
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Brake
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Total gaya pengereman {">="} 50% X total
                                      berat sumbu(kg)
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2">
                                  <div className="w-full">
                                    <Field
                                      className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      as="input"
                                      name="brake1"
                                      placeholder="Ketik di sini"
                                    />
                                    <ErrorMessage
                                      name="brake1"
                                      component="div"
                                      className="text-red-500 text-xs"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td />
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Selisih gaya pengereman roda kiri dan roda
                                      kanan dalam satu sumbu maksimum 8%
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2">
                                  <div className="w-full flex flex-col gap-1">
                                    <div>
                                      <Field
                                        className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        as="input"
                                        name="brake2"
                                        placeholder="I"
                                      />
                                      <ErrorMessage
                                        name="brake2"
                                        component="div"
                                        className="text-red-500 text-xs"
                                      />
                                    </div>
                                    <div>
                                      <Field
                                        className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        as="input"
                                        name="brake3"
                                        placeholder="II"
                                      />
                                      <ErrorMessage
                                        name="brake3"
                                        component="div"
                                        className="text-red-500 text-xs"
                                      />
                                    </div>
                                    <div>
                                      <Field
                                        className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        as="input"
                                        name="brake4"
                                        placeholder="III"
                                      />
                                      <ErrorMessage
                                        name="brake4"
                                        component="div"
                                        className="text-red-500 text-xs"
                                      />
                                    </div>
                                    <div>
                                      <Field
                                        className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        as="input"
                                        name="brake5"
                                        placeholder="IV"
                                      />
                                      <ErrorMessage
                                        name="brake5"
                                        component="div"
                                        className="text-red-500 text-xs"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-sm text-black dark:text-white">
                                      Lampu Utama
                                    </div>
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Head Lamp
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Kekuatan pancar lampu utama kanan 12000 cd
                                      (lampu jauh)
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2">
                                  <div className="w-full">
                                    <Field
                                      className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      as="input"
                                      name="headLamp1"
                                      placeholder="Ketik di sini"
                                    />
                                    <ErrorMessage
                                      name="headLamp1"
                                      component="div"
                                      className="text-red-500 text-xs"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td />
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Kekuatan pancar lampu utama kiri 12000 cd
                                      (lampu jauh)
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2">
                                  <div className="w-full">
                                    <Field
                                      className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      as="input"
                                      name="headLamp2"
                                      placeholder="Ketik di sini"
                                    />
                                    <ErrorMessage
                                      name="headLamp2"
                                      component="div"
                                      className="text-red-500 text-xs"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td />
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Penyimpangan ke kanan 0 34' (lampu jauh)
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2">
                                  <div className="w-full">
                                    <Field
                                      className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      as="input"
                                      name="headLamp3"
                                      placeholder="Ketik di sini"
                                    />
                                    <ErrorMessage
                                      name="headLamp3"
                                      component="div"
                                      className="text-red-500 text-xs"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td />
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Penyimpangan ke kiri 1 09' (lampu jauh)
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2">
                                  <div className="w-full">
                                    <Field
                                      className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      type="text"
                                      as="input"
                                      name="headLamp4"
                                      placeholder="Ketik di sini"
                                    />
                                    <ErrorMessage
                                      name="headLamp4"
                                      component="div"
                                      className="text-red-500 text-xs"
                                    />
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td className="py-2">
                                  <div className="text-start">
                                    <div className="font-medium text-black dark:text-white">
                                      Keterangan
                                    </div>
                                    <div className="font-medium text-xs italic text-graydark dark:text-white">
                                      Inspection Result
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2" colSpan={2}>
                                  <div className="w-full">
                                    <Field
                                      className="w-full h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                      as="select"
                                      name="inspectionResult"
                                    >
                                      <option value="">Pilih salah satu</option>
                                      <option value="LULUS UJI BERKALA">
                                        LULUS UJI BERKALA
                                      </option>
                                      <option value="TIDAK LULUS UJI BERKALA">
                                        TIDAK LULUS UJI BERKALA
                                      </option>
                                    </Field>
                                    <ErrorMessage
                                      name="inspectionResult"
                                      component="div"
                                      className="text-red-500 text-xs"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="p-2 w-full h-12 bg-primary rounded text-white"
                      >
                        Simpan & Export Ke PDF
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
