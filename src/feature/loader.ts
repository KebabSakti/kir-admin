import { AuthApi } from "./auth/auth_api";
import { AuthMock } from "./auth/auth_mock";
import { KirApi } from "./kir/kir_api";
import { KirMock } from "./kir/kir_mock";

export const authApi: AuthApi = new AuthMock();
export const kirApi: KirApi = new KirMock(20);
