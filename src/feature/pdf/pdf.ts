export interface Pdf {
  id?: string;
  title?: string;
  name?: string;
  level?: string;
  number?: string;
  stamp?: string | File;
  signature?: string | File;
  created?: Date;
  updated?: Date;
}
