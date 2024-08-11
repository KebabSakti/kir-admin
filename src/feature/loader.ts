import { AuthApi } from "./auth/auth_api";
import { AuthMock } from "./auth/auth_mock";
import { KirApi } from "./kir/kir_api";
import { KirMock } from "./kir/kir_mock";
import { PdfApi } from "./pdf/pdf_api";
import { PdfMock } from "./pdf/pdf_mock";

export const authApi: AuthApi = new AuthMock();
export const kirApi: KirApi = new KirMock(10);
export const pdfApi: PdfApi = new PdfMock();
