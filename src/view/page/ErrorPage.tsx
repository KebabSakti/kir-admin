import error from "../../assets/image/error.png";

export function ErrorPage() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-10 items-center justify-center">
        <img src={error} className="w-[80%] lg:w-[50%]" />
        <a href="/" className="bg-blue-500 py-2 px-4 rounded-full text-white">
          Halaman Utama
        </a>
      </div>
    </>
  );
}
