export interface ProfileDTO {
  fullName: string;
  firstName: string | null;
  username: string;
  surname: string | null;
  email: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2?: string | null;
  landmark?: string | null;
  area?: string | null;
  city?: string | null;
  postCode?: string | null;
  region?: string | null;
  state?: string | null;
  country?: string | null;
}
