import { AuthApi } from "./auth/auth_api";
import { AuthRemote } from "./auth/auth_remote";
import { KirApi } from "./kir/kir_api";
import { KirRemote } from "./kir/kir_remote";
import { PdfApi } from "./pdf/pdf_api";
import { PdfRemote } from "./pdf/pdf_remote";

export const authApi: AuthApi = new AuthRemote();
export const kirApi: KirApi = new KirRemote();
export const pdfApi: PdfApi = new PdfRemote();
