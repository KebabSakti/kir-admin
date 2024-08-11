import { createContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./view/component/Layout";
import { ErrorPage } from "./view/page/ErrorPage";
import { Middleware } from "./view/page/Middleware";
import { AccountPage } from "./view/page/auth/AccountPage";
import { LoginPage } from "./view/page/auth/LoginPage";
import { RecoveryPage } from "./view/page/auth/RecoveryPage";
import { AddKir } from "./view/page/kir/AddKir";
import { EditKir } from "./view/page/kir/EditKir";
import { ListKir } from "./view/page/kir/ListKir";
import { EditPdf } from "./view/page/pdf/EditPdf";
import { ListPdf } from "./view/page/pdf/ListPdf";

type Dependencies = {};

export const Context = createContext<Dependencies | undefined>(undefined);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/recovery",
    element: <RecoveryPage />,
  },
  {
    path: "/app",
    errorElement: <ErrorPage />,
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
        path: "/app/setting/:id/edit",
        element: <EditPdf />,
      },
    ],
  },
]);

export function App() {
  const dependencies: Dependencies = {};

  return (
    <Context.Provider value={dependencies}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}
