import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Status } from "../../../common/type";
import Breadcrumb from "../../component/Breadcrumb";
import { LoadingContainer } from "../../component/LoadingContainer";
import PageTitle from "../../component/PageTitle";
import { usePdfApi } from "./PdfHook";

export function ListPdf() {
  const pdfApi = usePdfApi();

  useEffect(() => {
    if (pdfApi.state.status == Status.idle && pdfApi.state.data == undefined) {
      pdfApi.list();
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
                                      href={item.stamp as string}
                                      target="_blank"
                                    >
                                      <img
                                        src={item.stamp as string}
                                        className="w-10"
                                      />
                                    </a>
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    <a
                                      href={item.signature as string}
                                      target="_blank"
                                    >
                                      <img
                                        src={item.signature as string}
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
