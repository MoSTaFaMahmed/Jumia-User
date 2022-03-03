import { DocumentReference } from '@angular/fire/compat/firestore';

export interface IOrder {
  buyer?: any;
  id?: string;
  Product?: [
    {
      Product_Id?: any;
      Product_Quntity?: number;
      Total_Price?: number;
    }
  ] |any;
  Total?: number;
  date?: string;
}
