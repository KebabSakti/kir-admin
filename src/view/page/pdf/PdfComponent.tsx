import { ErrorMessage, Field } from "formik";
import { ReactNode, useRef, useState } from "react";
import { isValidFileType } from "../../../common/utility";

export type PdfSectionParam = {
  title: string;
};

export type PdfFieldParam = {
  title: string;
  type?: string;
  name: string;
  as: string;
  placeholder?: string;
};

export type PdfUploadParam = {
  title: string;
  name: string;
  image?: string;
  setFieldValue: Function;
};

export function PdfSection({
  children,
  param,
}: {
  children: ReactNode;
  param: PdfSectionParam;
}) {
  return (
    <>
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <div className="font-medium text-black dark:text-white">
              {param.title}
            </div>
          </div>
          <div className="p-7">
            <div className="flex flex-col gap-5">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export function PdfField({
  children,
  param,
}: {
  children?: ReactNode;
  param: PdfFieldParam;
}) {
  return (
    <>
      <div className="flex gap-5 items-center justify-center">
        <div className="flex flex-col w-20">
          <div className="text-[16px] text-black dark:text-white">
            {param.title}
          </div>
        </div>
        <div className="w-full">
          <Field
            className="w-full rounded border border-stroke bg-gray p-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            type={param.type}
            as={param.as}
            name={param.name}
            placeholder={param.placeholder}
          >
            {children}
          </Field>
          <ErrorMessage
            name={param.name}
            component="div"
            className="text-red-500 text-xs"
          />
        </div>
      </div>
    </>
  );
}

export function PdfUpload({ param }: { param: PdfUploadParam }) {
  const ref: any = useRef(null);
  const [image, setImage] = useState<File>();

  return (
    <>
      <div
        className="flex flex-col gap-2 w-20 cursor-pointer lg:w-30"
        onClick={() => {
          ref.current?.click();
        }}
      >
        {(() => {
          if (image) {
            return (
              <img
                className="bg-gray h-20 object-cover rounded-lg lg:h-30"
                src={URL.createObjectURL(image)}
              />
            );
          }

          if (param.image != undefined) {
            return (
              <img
                className="bg-gray h-20 object-cover rounded-lg lg:h-30"
                src={param.image}
              />
            );
          }

          return (
            <div className="bg-gray h-20 border border-dashed rounded-lg flex items-center justify-center text-black dark:bg-meta-4 dark:text-white lg:h-30">
              Pilih file
            </div>
          );
        })()}

        <div className="flex flex-col justify-center items-center">
          <div className="font-medium text-center text-black dark:text-white">
            {param.title}
          </div>
          <div className="font-medium text-center text-xs">
            <input
              type="file"
              name={param.name}
              className="hidden"
              ref={ref}
              onChange={(e) => {
                if (e.target.files != null) {
                  const file = e.target.files[0];
                  const isValid = isValidFileType(file);

                  if (!isValid) {
                    alert("File format tidak didukung");
                  } else {
                    setImage(file);
                    param.setFieldValue(param.name, file);
                  }
                }
              }}
            />
            <div>(jpg,jpeg,png,webp)</div>
            <ErrorMessage
              name={param.name}
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
      </div>
    </>
  );
}
