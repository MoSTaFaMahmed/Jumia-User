import { DocumentReference } from "@angular/fire/compat/firestore";

export interface ICart {
  id?: string;
  idd?:any;
  Category?: String;
  CategoryAr?: string;
  Description?: string;
  DescriptionAr?:string;
  Image?: string;
  Name?: string;
  NameAr?: string;
  Price?: number;
  Quantity?: number;
  Rank?: number;
  SellerID?:any;
  Size?: string;
  subtotal?:number
}
