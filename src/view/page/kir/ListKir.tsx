import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Status } from "../../../common/type";
import { KirListParam } from "../../../feature/kir/kir_api";
import Breadcrumb from "../../component/Breadcrumb";
import { LoadingContainer } from "../../component/LoadingContainer";
import PageTitle from "../../component/PageTitle";
import { useKirApi } from "./KirHook";
import dayjs from "dayjs";
import { server } from "../../../common/config";

export function ListKir() {
  const kirApi = useKirApi();

  const [param, setParam] = useState<KirListParam>({
    pagination: {
      skip: 0,
      take: 10,
    },
  });

  useEffect(() => {
    if (kirApi.state.status == Status.idle && kirApi.state.data == undefined) {
      kirApi.list(param);
    }

    if (
      kirApi.state.action == "remove" &&
      kirApi.state.status == Status.complete &&
      kirApi.state.error == undefined
    ) {
      kirApi.list(param);
      toast.success("Data berhasil dihapus");
    }

    if (
      kirApi.state.action == "remove" &&
      kirApi.state.status == Status.complete &&
      kirApi.state.error != undefined
    ) {
      kirApi.list(param);
      toast.error(kirApi.state.error.message);
    }
  }, [kirApi.state]);

  useEffect(() => {
    kirApi.list(param);
  }, [param]);

  return (
    <>
      <PageTitle title="Daftar Kir | Uji Kir App" />
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Daftar Kir" />
        <div className="rounded-sm border border-stroke bg-white p-7 shadow-default overflow-x-scroll dark:border-strokedark dark:bg-boxdark">
          <LoadingContainer loading={false}>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-between items-center">
                <Link
                  to="/app/kir/add"
                  className="bg-primary text-white p-2 rounded h-10 flex items-center justify-center"
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
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    placeholder="Nomor Sertifikat"
                    className="w-fit h-10 rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    onChange={(e) => {
                      let updatedParam: any = {};

                      if (e.target.value.length > 0) {
                        updatedParam = {
                          certificateNumber: e.target.value,
                        };
                      } else {
                        updatedParam = {
                          pagination: {
                            skip: 0,
                            take: 10,
                          },
                        };
                      }

                      setParam(updatedParam);
                    }}
                  />
                  <div className="flex gap-1 items-center">
                    <button
                      className="bg-blue-500 h-10 p-2 rounded disabled:bg-[#ccc] disabled:dark:bg-[#575757]"
                      disabled={param.pagination == undefined}
                      onClick={() => {
                        //prev
                        const updatedParam = {
                          pagination: {
                            ...param.pagination,
                            skip:
                              param.pagination?.skip! >= 10
                                ? param.pagination?.skip! -
                                  param.pagination?.take!
                                : 0,
                          },
                        };

                        setParam(updatedParam);
                      }}
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
                          d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                    <div className="border border-blue-500 w-10 text-center h-10 p-2 rounded text-black dark:text-white">
                      {param.pagination?.skip != undefined
                        ? param.pagination?.skip! / 10 + 1
                        : 1}
                    </div>
                    <button
                      className="bg-blue-500 h-10 p-2 rounded disabled:bg-[#ccc] disabled:dark:bg-[#575757]"
                      disabled={param.pagination == undefined}
                      onClick={() => {
                        // next
                        const updatedParam = {
                          pagination: {
                            ...param.pagination,
                            skip:
                              param.pagination?.skip! + param.pagination?.take!,
                          },
                        };

                        setParam(updatedParam);
                      }}
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
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      No. Sertifikat
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      Pemilik
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      No. Uji
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      Status
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      Tgl. Terbit
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      Tgl. Expired
                    </th>
                    <th className="font-semibold text-sm text-start p-2 bg-gray text-black dark:text-white dark:bg-graydark">
                      #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    if (
                      kirApi.state.status == Status.complete &&
                      kirApi.state.data instanceof Array
                    ) {
                      if (kirApi.state.data.length > 0) {
                        return (
                          <>
                            {kirApi.state.data.map((item) => {
                              return (
                                <tr
                                  key={item.id}
                                  className="odd:bg-slate-50 odd:dark:bg-form-strokedark even:bg-slate-100 even:dark:bg-graydark hover:bg-slate-200 hover:dark:bg-slate-800"
                                >
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {item.certificateNumber}
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {item.owner}
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {item.inspectionNumber}
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {item.inspectionResult}
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {dayjs(item.created!).format("DD/MM/YYYY")}
                                  </td>
                                  <td className="text-sm text-start p-2 text-black dark:text-white">
                                    {dayjs(item.expiryDate!).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </td>
                                  <td className="p-2">
                                    <div className="flex gap-1">
                                      <Link
                                        to={`${server}/certificate/${item.certificateNumber}`}
                                        target="_blank"
                                        className="p-2 bg-green-500 text-white rounded text-xs font-semibold"
                                      >
                                        PDF
                                      </Link>
                                      <Link
                                        to={`/app/kir/${item.id}/edit`}
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
                                            kirApi.remove(item.id!);
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
                      kirApi.state.action == "list" &&
                      kirApi.state.status == Status.complete &&
                      kirApi.state.error != undefined
                    ) {
                      return (
                        <tr>
                          <td
                            colSpan={7}
                            className="text-center p-4 font-medium text-sm text-black dark:text-white bg-slate-50 dark:bg-form-strokedark"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="text-red-500">
                                {kirApi.state.error.message}
                              </div>
                              <button
                                type="button"
                                className="bg-primary py-1 px-2 rounded text-white w-fit"
                                onClick={() => {
                                  kirApi.list();
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
