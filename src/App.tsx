import { createContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import Layout from "./view/component/Layout";
import { ErrorPage } from "./view/page/ErrorPage";
import { Middleware } from "./view/page/Middleware";
import { AccountPage } from "./view/page/auth/AccountPage";
import { AuthApiType, useAuthApi } from "./view/page/auth/AuthHook";
import { LoginPage } from "./view/page/auth/LoginPage";
import { AddKir } from "./view/page/kir/AddKir";
import { EditKir } from "./view/page/kir/EditKir";
import { ListKir } from "./view/page/kir/ListKir";
import { AddPdf } from "./view/page/pdf/AddPdf";
import { EditPdf } from "./view/page/pdf/EditPdf";
import { ListPdf } from "./view/page/pdf/ListPdf";

type Dependencies = {
  authApi: AuthApiType;
};

export const Context = createContext<Dependencies | undefined>(undefined);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <LoginPage />,
  },
  // {
  //   path: "/recovery",
  //   element: <RecoveryPage />,
  // },
  {
    path: "/app",
  element: (
      <Middleware>
        <Layout />
      </Middleware>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/app/kir/add" />,
      },
      {
        path: "/app/kir",
        element: <ListKir />,
      },
      {
        path: "/app/kir/add",
        element: <AddKir />,
      },
      {
        path: "/app/kir/:id/edit",
        element: <EditKir />,
      },
      {
        path: "/app/account",
        element: <AccountPage />,
      },
      {
        path: "/app/setting",
        element: <ListPdf />,
      },
      {
        path: "/app/setting/add",
        element: <AddPdf />,
      },
      {
        path: "/app/setting/:id/edit",
        element: <EditPdf />,
      },
    ],
  },
]);

export function App() {
  const dependencies: Dependencies = {
    authApi: useAuthApi(),
  };

  return (
    <Context.Provider value={dependencies}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Flip}
      />
      <RouterProvider router={router} />
    </Context.Provider>
  );
}
