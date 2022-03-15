import { DocumentReference } from '@angular/fire/compat/firestore';
import IProduct from './Iproduct';

export interface IProductOrder {
  id?: string;
  Product?: IProduct;
  Product_Quntity?: number;
  Total_Price?: number;
  deliveredstatus?: string;
}
