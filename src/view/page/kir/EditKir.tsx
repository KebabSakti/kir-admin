import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Status } from "../../../common/type";
import { Pdf } from "../../../feature/pdf/pdf";
import Breadcrumb from "../../component/Breadcrumb";
import { LoadingContainer } from "../../component/LoadingContainer";
import PageTitle from "../../component/PageTitle";
import { usePdfApi } from "../pdf/PdfHook";
import { addKirValidationSchema, editKirInitialValues } from "./kir_form";
import {
  KirField,
  KirFieldSelect,
  KirSection,
  KirUpload,
} from "./KirComponent";
import { useKirApi } from "./KirHook";

export function EditKir() {
  const { id } = useParams();
  const kirApi = useKirApi();
  const pdfApi = usePdfApi();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(editKirInitialValues);

  useEffect(() => {
    initKirApi();
    initPdfApi();
  }, [kirApi.state, pdfApi.state]);

  function initKirApi() {
    if (kirApi.state.status == Status.idle && kirApi.state.data == undefined) {
      kirApi.read(id!);
    }

    if (
      kirApi.state.action == "read" &&
      kirApi.state.status == Status.complete &&
      kirApi.state.data != undefined
    ) {
      setInitialValues(kirApi.state.data);
    }

    if (
      kirApi.state.action == "read" &&
      kirApi.state.status == Status.complete &&
      (kirApi.state.error != undefined || kirApi.state.data == undefined)
    ) {
      navigate("/app/kir", { replace: true });
      toast.error(kirApi.state.error?.message);
    }

    if (
      kirApi.state.action == "update" &&
      kirApi.state.status == Status.complete &&
      kirApi.state.error == undefined
    ) {
      navigate("/app/kir", { replace: true });
      toast.success("Data berhasil di update");
    }

    if (
      kirApi.state.action == "update" &&
      kirApi.state.status == Status.complete &&
      kirApi.state.error != undefined
    ) {
      toast.error(kirApi.state.error.message);
    }
  }

  function initPdfApi() {
    if (pdfApi.state.status == Status.idle && pdfApi.state.data == undefined) {
      pdfApi.list();
    }

    if (
      pdfApi.state.action == "list" &&
      pdfApi.state.status == Status.complete &&
      pdfApi.state.error != undefined
    ) {
      navigate("/app/kir", { replace: true });
      toast.error(pdfApi.state.error.message);
    }
  }

  return (
    <>
      <PageTitle title="Tambah Data Kir | Uji Kir App" />
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Edit Data Kir" />
        <LoadingContainer
          loading={
            kirApi.state.status == Status.loading ||
            pdfApi.state.status == Status.loading
          }
        >
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={addKirValidationSchema}
            onSubmit={(values) => {
              kirApi.update(values);
            }}
          >
            {({ setFieldValue, setValues, values }) => {
              return (
                <Form action="#">
                  <div className="flex flex-col gap-2">
                    <KirSection
                      param={{
                        title: "IDENTITAS PEMILIK KENDARAAN BERMOTOR",
                        subtitle: "VEHICLE OWNER IDENTIFICATION",
                      }}
                    >
                      <KirField
                        param={{
                          title: "Nama pemilik",
                          subtitle: "Owner's name",
                          type: "text",
                          as: "input",
                          name: "owner",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Alamat pemilik",
                          subtitle: "Owner's address",
                          type: "text",
                          as: "textarea",
                          name: "address",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </KirSection>

                    <KirSection
                      param={{
                        title: "IDENTITAS BLUe",
                        subtitle: "BLUe Identity",
                      }}
                    >
                      <KirField
                        param={{
                          title: "Nomor Kartu",
                          subtitle: "Card Number",
                          type: "text",
                          as: "input",
                          name: "cardNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Nomor RFID",
                          subtitle: "RFID Number",
                          type: "text",
                          as: "input",
                          name: "rfid",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </KirSection>

                    <KirSection
                      param={{
                        title: "IDENTITAS KENDARAAN BERMOTOR",
                        subtitle: "VEHICLE IDENTIFICATION",
                      }}
                    >
                      <KirField
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
                      <KirField
                        param={{
                          title: "Nomor registrasi kendaraan",
                          subtitle: "Vehicle registration number",
                          type: "text",
                          as: "input",
                          name: "registrationNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Nomor rangka kendaraan",
                          subtitle: "Chasis number",
                          type: "text",
                          as: "input",
                          name: "chasisNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Nomor motor penggerak",
                          subtitle: "Engine number",
                          type: "text",
                          as: "input",
                          name: "engineNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Nomor uji kendaraan",
                          subtitle: "Vehicle inspection number",
                          type: "text",
                          as: "input",
                          name: "inspectionNumber",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </KirSection>

                    <KirSection
                      param={{
                        title: "FOTO BERWARNA KENDARAAN",
                        subtitle: "Vehicle colored photo",
                      }}
                    >
                      <div className="flex justify-between">
                        <KirUpload
                          param={{
                            title: "Foto Depan",
                            subtitle: "Front Picture",
                            name: "frontPic",
                            image: values.frontPic,
                            setFieldValue: setFieldValue,
                          }}
                        />
                        <KirUpload
                          param={{
                            title: "Foto Belakang",
                            subtitle: "Back Picture",
                            name: "backPic",
                            image: values.backPic,
                            setFieldValue: setFieldValue,
                          }}
                        />
                        <KirUpload
                          param={{
                            title: "Foto Kanan",
                            subtitle: "Right Picture",
                            name: "rightPic",
                            image: values.rightPic,
                            setFieldValue: setFieldValue,
                          }}
                        />
                        <KirUpload
                          param={{
                            title: "Foto Kiri",
                            subtitle: "Left Picture",
                            name: "leftPic",
                            image: values.leftPic,
                            setFieldValue: setFieldValue,
                          }}
                        />
                      </div>
                    </KirSection>

                    <KirSection
                      param={{
                        title: "SPESIFIKASI TEKNIS KENDARAAN",
                        subtitle: "VEHICLE TECHNICAL SPESIFICATIONS",
                      }}
                    >
                      <KirField
                        param={{
                          title: "Jenis",
                          subtitle: "Purpose of vehicle",
                          type: "text",
                          as: "input",
                          name: "vehicleType",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Merk/tipe",
                          subtitle: "Brand/type",
                          type: "text",
                          as: "input",
                          name: "vehicleBrand",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Tahun pembuatan/perakitan",
                          subtitle: "Year manufactured/assembled",
                          type: "text",
                          as: "input",
                          name: "yearManufacture",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Bahan bakar/sumber energi",
                          subtitle: "Fuel/energy source",
                          type: "text",
                          as: "input",
                          name: "fuel",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Isi silinder",
                          subtitle: "Engine capacity",
                          type: "text",
                          as: "input",
                          name: "engineCapacity",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Daya motor",
                          subtitle: "Engine power",
                          type: "text",
                          as: "input",
                          name: "enginePower",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Ukuran ban",
                          subtitle: "Tyre size",
                          type: "text",
                          as: "input",
                          name: "tyreSize",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Konfigurasi sumbu",
                          subtitle: "Axle configuration",
                          type: "text",
                          as: "input",
                          name: "axleConfiguration",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
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
                      <KirField
                        param={{
                          title: "Panjang",
                          subtitle: "Length",
                          type: "text",
                          as: "input",
                          name: "length",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Lebar",
                          subtitle: "Width",
                          type: "text",
                          as: "input",
                          name: "width",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Tinggi",
                          subtitle: "Height",
                          type: "text",
                          as: "input",
                          name: "height",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Julur depan",
                          subtitle: "Front everhang",
                          type: "text",
                          as: "input",
                          name: "front",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
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
                      <KirField
                        param={{
                          title: "Sumbu I-II",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "sumbu1",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Sumbu II-III",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "sumbu2",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Sumbu III-IV",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "sumbu3",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <div className="text-[16px] font-semibold text-black dark:text-white">
                        Dimensi bak muatan/tangki
                      </div>
                      <KirField
                        param={{
                          title: "Panjang x Lebar x Tinggi",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "dimension",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "JBB/JBKB",
                          subtitle: "GVW/GVCW",
                          type: "text",
                          as: "input",
                          name: "jbbJbkb",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "JBI/JBKI",
                          subtitle: "PVW/PVCW",
                          type: "text",
                          as: "input",
                          name: "jbiJbki",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Daya angkut (orang/kg)",
                          subtitle: "Payload (person(s)/kg(s))",
                          type: "text",
                          as: "input",
                          name: "payload",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Kelas jalan terendah yang boleh dilalui",
                          subtitle: "Lowest class road permitted",
                          type: "text",
                          as: "input",
                          name: "classPermit",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "MST",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "mst",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </KirSection>

                    <KirSection
                      param={{
                        title: "RINCIAN HASIL UJI",
                        subtitle: "",
                      }}
                    >
                      <div className="text-[16px] font-semibold text-black dark:text-white">
                        Hasil Uji Rem
                      </div>
                      <KirField
                        param={{
                          title: "Rem Utama",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "brake1",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Rem Utama Sumbu I",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "brake2",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Rem Utama Sumbu II",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "brake3",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Rem Utama Sumbu III",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "brake4",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Rem Utama Sumbu IV",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "brake5",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <div className="text-[16px] font-semibold text-black dark:text-white">
                        Hasil Uji Lampu
                      </div>
                      <KirField
                        param={{
                          title: "Lampu Utama Kanan",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "headLamp1",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Lampu Utama Kiri",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "headLamp2",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Lampu Utama Penyimpangan Kanan",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "headLamp3",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Lampu Utama Penyimpangan Kiri",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "headLamp4",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <div className="text-[16px] font-semibold text-black dark:text-white">
                        Hasil Uji Emisi
                      </div>
                      <KirField
                        param={{
                          title: "Emisi CO",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "coEmision",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Emisi HC",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "hcEmision",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Ketebalan Asap",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "smokeDensity",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </KirSection>

                    <KirSection
                      param={{ title: "KETERANGAN HASIL UJI", subtitle: "" }}
                    >
                      <div className="flex gap-5 items-center justify-center">
                        <div className="flex flex-col w-96">
                          <div className="text-[16px] text-black dark:text-white">
                            HASIL UJI
                          </div>
                        </div>
                        <div className="w-full">
                          <Field
                            className="w-full rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            as="select"
                            name="inspectionResult"
                          >
                            <option value="">Pilih salah satu</option>
                            <option value="LULUS">LULUS</option>
                            <option value="TIDAK LULUS">TIDAK LULUS</option>
                          </Field>
                          <ErrorMessage
                            name="inspectionResult"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>
                      </div>
                      <div className="text-[16px] font-semibold text-black dark:text-white">
                        Asal Kendaraan Wajib Uji
                      </div>
                      <KirField
                        param={{
                          title: "Wilayah",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "region",
                          placeholder: "Ketik di sini",
                        }}
                      />
                      <KirField
                        param={{
                          title: "Wilayah Asal",
                          subtitle: "",
                          type: "text",
                          as: "input",
                          name: "origin",
                          placeholder: "Ketik di sini",
                        }}
                      />
                    </KirSection>

                    <KirSection
                      param={{
                        title: "STEMPEL DAN TANDA TANGAN",
                        subtitle: "",
                      }}
                    >
                      <KirFieldSelect
                        title="Direktur jendral perhubungan darat"
                        name="director"
                        onChange={(e: any) => {
                          const pdf = (pdfApi.state.data as Array<Pdf>).find(
                            (i) => i.name == e.target.value
                          );

                          setValues({
                            ...values,
                            director: pdf?.name ?? "",
                            directorLevel: pdf?.level ?? "",
                            directorNumber: pdf?.number ?? "",
                            directorStamp: pdf?.stamp ?? "",
                            directorSignature: pdf?.signature ?? "",
                          });
                        }}
                      >
                        <option value="">Pilih salah satu</option>
                        {(() => {
                          if (
                            pdfApi.state.status == Status.complete &&
                            pdfApi.state.data instanceof Array
                          ) {
                            return (
                              <>
                                {pdfApi.state.data.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </>
                            );
                          }
                        })()}
                      </KirFieldSelect>
                      <KirFieldSelect
                        title="Nama petugas penguji"
                        name="inspector"
                        onChange={(e: any) => {
                          const pdf = (pdfApi.state.data as Array<Pdf>).find(
                            (i) => i.name == e.target.value
                          );

                          setValues({
                            ...values,
                            inspector: pdf?.name ?? "",
                            inspectorLevel: pdf?.level ?? "",
                            inspectorNumber: pdf?.number ?? "",
                            inspectorStamp: pdf?.stamp ?? "",
                            inspectorSignature: pdf?.signature ?? "",
                          });
                        }}
                      >
                        <option value="">Pilih salah satu</option>
                        {(() => {
                          if (
                            pdfApi.state.status == Status.complete &&
                            pdfApi.state.data instanceof Array
                          ) {
                            return (
                              <>
                                {pdfApi.state.data.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </>
                            );
                          }
                        })()}
                      </KirFieldSelect>

                      <KirFieldSelect
                        title="Nama kepala dinas"
                        name="agency"
                        onChange={(e: any) => {
                          const pdf = (pdfApi.state.data as Array<Pdf>).find(
                            (i) => i.name == e.target.value
                          );

                          setValues({
                            ...values,
                            agency: pdf?.name ?? "",
                            agencyLevel: pdf?.level ?? "",
                            agencyNumber: pdf?.number ?? "",
                            agencyStamp: pdf?.stamp ?? "",
                            agencySignature: pdf?.signature ?? "",
                          });
                        }}
                      >
                        <option value="">Pilih salah satu</option>
                        {(() => {
                          if (
                            pdfApi.state.status == Status.complete &&
                            pdfApi.state.data instanceof Array
                          ) {
                            return (
                              <>
                                {pdfApi.state.data.map((item) => (
                                  <option key={item.id} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </>
                            );
                          }
                        })()}
                      </KirFieldSelect>
                    </KirSection>

                    {/* <div className="col-span-5 xl:col-span-3">
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
                    </div> */}

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
