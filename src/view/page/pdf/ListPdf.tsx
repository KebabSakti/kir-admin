import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Status } from "../../../common/type";
import Breadcrumb from "../../component/Breadcrumb";
import { LoadingContainer } from "../../component/LoadingContainer";
import PageTitle from "../../component/PageTitle";
import { usePdfApi } from "./PdfHook";
import { toast } from "react-toastify";
import { server } from "../../../common/config";

export function ListPdf() {
  const pdfApi = usePdfApi();

  useEffect(() => {
    if (pdfApi.state.status == Status.idle && pdfApi.state.data == undefined) {
      pdfApi.list();
    }

    if (
      pdfApi.state.action == "remove" &&
      pdfApi.state.status == Status.complete &&
      pdfApi.state.error == undefined
    ) {
      pdfApi.list();
      toast.success("Data berhasil di hapus");
    }

    if (
      pdfApi.state.action == "remove" &&
      pdfApi.state.status == Status.complete &&
      pdfApi.state.error != undefined
    ) {
      pdfApi.list();
      toast.error(pdfApi.state.error.message);
    }
  }, [pdfApi.state]);

  return (
    <>
      <PageTitle title="Setting | Uji Kir App" />
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Setting Dokumen" />
        <div className="rounded-sm border border-stroke bg-white p-7 shadow-default overflow-x-scroll dark:border-strokedark dark:bg-boxdark">
          <LoadingContainer loading={false}>
            <div className="flex flex-col gap-4">
              <Link
                to="/app/setting/add"
                className="bg-primary w-fit text-white p-2 rounded h-10 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 stroke-white stroke-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <div>Baru</div>
              </Link>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      Nama
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      Level
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      Nomor
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      Stempel
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      TTD
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    if (
                      pdfApi.state.status == Status.complete &&
                      pdfApi.state.data instanceof Array
                    ) {
                      if (pdfApi.state.data.length > 0) {
                        return (
                          <>
                            {pdfApi.state.data.map((item) => {
                              return (
                                <tr
                                  key={item.id}
                                  className="odd:bg-slate-50 odd:dark:bg-form-strokedark even:bg-slate-100 even:dark:bg-graydark hover:bg-slate-200 hover:dark:bg-slate-800"
                                >
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {item.name}
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {item.level}
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {item.number}
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    <a
                                      href={`${server}/${item.stamp}`}
                                      target="_blank"
                                    >
                                      <img
                                        src={`${server}/${item.stamp}`}
                                        className="w-10"
                                      />
                                    </a>
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    <a
                                      href={`${server}/${item.signature}`}
                                      target="_blank"
                                    >
                                      <img
                                        src={`${server}/${item.signature}`}
                                        className="w-10"
                                      />
                                    </a>
                                  </td>
                                  <td className="p-2">
                                    <div className="flex gap-1">
                                      <Link
                                        to={`/app/setting/${item.id}/edit`}
                                        className="p-2 bg-orange-500 text-white rounded text-xs font-semibold"
                                      >
                                        Edit
                                      </Link>
                                      <button
                                        type="button"
                                        className="p-2 bg-red-500 text-white rounded text-xs font-semibold"
                                        onClick={() => {
                                          if (
                                            confirm(
                                              "Data akan dihapus, proses ini tidak dapat dikembalikan. Anda yakin?"
                                            )
                                          ) {
                                            pdfApi.remove(item.id!);
                                          }
                                        }}
                                      >
                                        Hapus
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </>
                        );
                      }

                      return (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center p-4 font-medium text-sm text-black dark:text-white bg-slate-50 dark:bg-form-strokedark"
                          >
                            Data tidak tersedia
                          </td>
                        </tr>
                      );
                    }

                    if (
                      pdfApi.state.action == "list" &&
                      pdfApi.state.status == Status.complete &&
                      pdfApi.state.error != undefined
                    ) {
                      return (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center p-4 font-medium text-sm text-black dark:text-white bg-slate-50 dark:bg-form-strokedark"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="text-red-500">
                                {pdfApi.state.error.message}
                              </div>
                              <button
                                type="button"
                                className="bg-primary py-1 px-2 rounded text-white w-fit"
                                onClick={() => {
                                  pdfApi.list();
                                }}
                              >
                                Coba lagi
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center p-4 font-medium text-sm text-black dark:text-white bg-slate-50 dark:bg-form-strokedark"
                        >
                          Loading..
                        </td>
                      </tr>
                    );
                  })()}
                </tbody>
              </table>
            </div>
          </LoadingContainer>
        </div>
      </div>
    </>
  );
}
