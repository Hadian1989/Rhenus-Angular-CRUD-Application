import { IAddress } from "./IAddress";

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  address: IAddress;
}
