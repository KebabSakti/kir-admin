import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Status } from "../../common/type";
import { useAuthApi } from "./auth/AuthHook";

export function Middleware({ children }: { children: ReactNode }) {
  const authApi = useAuthApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (authApi.state.status == Status.idle) {
      authApi.init();
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
