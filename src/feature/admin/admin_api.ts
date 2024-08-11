export type AdminUpdateParam = {
  id: string;
  email: string;
  password: string;
};

export abstract class AdminApi {
  abstract update(param: AdminUpdateParam): Promise<void>;
  abstract emailResetLink(email: string): Promise<void>;
}
