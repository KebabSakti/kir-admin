import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Status } from "../../common/type";
import { useAuthApi } from "./auth/AuthHook";

export function Middleware({ children }: { children: ReactNode }) {
  const authApi = useAuthApi();

  useEffect(() => {
    authApi.init();
  }, []);

  if (
    authApi.state.status == Status.complete &&
    authApi.state.data == undefined
  ) {
    return <Navigate to="/" replace />;
  }

  if (
    authApi.state.status == Status.complete &&
    authApi.state.data != undefined
  ) {
    return children;
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        LOADING...
      </div>
    </>
  );
}
