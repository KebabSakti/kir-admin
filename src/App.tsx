import { createContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./view/component/Layout";
import { Middleware } from "./view/page/Middleware";
import { AuthApiType, useAuthApi } from "./view/page/auth/AuthHook";
import { LoginPage } from "./view/page/auth/LoginPage";
import { RecoveryPage } from "./view/page/auth/RecoveryPage";
import { AddKir } from "./view/page/kir/AddKir";
import { EditKir } from "./view/page/kir/EditKir";
import { ListKir } from "./view/page/kir/ListKir";

type Dependencies = {
  authApi: AuthApiType;
};

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
    ],
  },
]);

export function App() {
  const dependencies: Dependencies = {
    authApi: useAuthApi(),
  };

  return (
    <Context.Provider value={dependencies}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}
