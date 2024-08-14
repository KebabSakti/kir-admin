import { AuthApi } from "./auth/auth_api";
import { AuthMock } from "./auth/auth_mock";
import { KirApi } from "./kir/kir_api";
import { KirRemote } from "./kir/kir_remote";
import { PdfApi } from "./pdf/pdf_api";
import { PdfMock } from "./pdf/pdf_mock";

export const authApi: AuthApi = new AuthMock();
export const kirApi: KirApi = new KirRemote();
export const pdfApi: PdfApi = new PdfMock();
