import { ErrorMessage, Field } from "formik";
import { ReactNode, useRef, useState } from "react";
import { isValidFileType } from "../../../common/utility";

export type KirSectionParam = {
  title: string;
  subtitle: string;
};

export type KirFieldParam = {
  title: string;
  subtitle: string;
  type?: string;
  name: string;
  as: string;
  placeholder?: string;
};

export type KirUploadParam = {
  title: string;
  subtitle: string;
  name: string;
  image?: string;
  setFieldValue: Function;
};

export function KirSection({
  children,
  param,
}: {
  children: ReactNode;
  param: KirSectionParam;
}) {
  return (
    <>
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <div className="font-medium text-black dark:text-white">
              {param.title}
            </div>
            <div className="font-medium text-xs italic text-graydark dark:text-white">
              {param.subtitle}
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

export function KirField({
  children,
  param,
}: {
  children?: ReactNode;
  param: KirFieldParam;
}) {
  return (
    <>
      <div className="flex gap-5 items-center justify-center">
        <div className="flex flex-col w-96">
          <div className="text-[16px] text-black dark:text-white">
            {param.title}
          </div>
          <div className="text-[12px] italic text-graydark dark:text-white">
            {param.subtitle}
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

export function KirUpload({ param }: { param: KirUploadParam }) {
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
          <div className="font-medium text-center text-xs italic text-graydark dark:text-white">
            {param.subtitle}
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
