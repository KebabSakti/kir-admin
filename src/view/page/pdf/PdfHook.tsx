import { useState } from "react";
import { State, Status } from "../../../common/type";
import { pdfApi } from "../../../feature/loader";
import { Pdf } from "../../../feature/pdf/pdf";
import { PdfCreateParam, PdfUpdateParam } from "../../../feature/pdf/pdf_api";

export type PdfApiType = {
  create(param: PdfCreateParam): Promise<void>;
  read(id: string): Promise<void>;
  update(param: PdfUpdateParam): Promise<void>;
  remove(id: string): Promise<void>;
  list(): Promise<void>;
  state: State<Pdf>;
};

export function usePdfApi(): PdfApiType {
  const [state, setState] = useState<State<Pdf>>({
    action: "idle",
    status: Status.idle,
  });

  async function create(param: PdfCreateParam): Promise<void> {
    setState({ status: Status.loading, action: "create" });

    await pdfApi
      .create(param)
      .then(() => {
        setState({
          status: Status.complete,
          action: "create",
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "create",
          error: error,
        });
      });
  }

  async function read(id: string): Promise<void> {
    setState({ status: Status.loading, action: "read" });

    await pdfApi
      .read(id)
      .then((result) => {
        setState({
          status: Status.complete,
          action: "read",
          data: result,
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "read",
          error: error,
        });
      });
  }

  async function update(param: PdfUpdateParam): Promise<void> {
    setState({ status: Status.loading, action: "update" });

    await pdfApi
      .update(param)
      .then(() => {
        setState({
          status: Status.complete,
          action: "update",
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "update",
          error: error,
        });
      });
  }

  async function remove(id: string): Promise<void> {
    setState({ status: Status.loading, action: "remove" });

    await pdfApi
      .remove(id)
      .then(() => {
        setState({
          status: Status.complete,
          action: "remove",
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "remove",
          error: error,
        });
      });
  }

  async function list(): Promise<void> {
    setState({ status: Status.loading, action: "list" });

    await pdfApi
      .list()
      .then((result) => {
        setState({
          status: Status.complete,
          action: "list",
          data: result,
        });
      })
      .catch((error: Error) => {
        setState({
          status: Status.complete,
          action: "list",
          error: error,
        });
      });
  }

  return { create, read, update, remove, list, state };
}
