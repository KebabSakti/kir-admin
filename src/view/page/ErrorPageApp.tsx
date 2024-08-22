import { useNavigate } from "react-router-dom";
import error from "../../assets/image/error.png";

export function ErrorPageApp() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-10 items-center justify-center">
        <img src={error} className="w-[80%] lg:w-[50%]" />
        <button
          type="button"
          className="bg-blue-500 py-2 px-4 rounded-full text-white"
          onClick={() => {
            navigate(-1);
          }}
        >
          Halaman Utama
        </button>
      </div>
    </>
  );
}
