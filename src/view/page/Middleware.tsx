import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../App";
import { Status } from "../../common/type";

export function Middleware({ children }: { children: ReactNode }) {
  const { authApi } = useContext(Context)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      authApi.state.status == Status.idle &&
      authApi.state.data == undefined
    ) {
      authApi.init();
    }

    if (
      authApi.state.action == "update" &&
      authApi.state.status == Status.complete &&
      authApi.state.error == undefined
    ) {
      toast.success("Akun berhasil di update, harap login ulang");
      authApi.logout();
    }

    if (
      authApi.state.action == "update" &&
      authApi.state.status == Status.complete &&
      authApi.state.error != undefined
    ) {
      toast.error(authApi.state.error.message);
    }

    if (
      authApi.state.status == Status.complete &&
      authApi.state.data == undefined
    ) {
      navigate("/", { replace: true });
    }

  }, [authApi.state]);

  return (
    <>
      {(() => {
        if (
          authApi.state.status == Status.complete &&
          authApi.state.data != undefined
        ) {
          return children;
        }

        return (
          <div className="h-screen flex justify-center items-center">
            LOADING...
          </div>
        );
      })()}
    </>
  );
}
