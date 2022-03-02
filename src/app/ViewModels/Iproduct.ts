import { DocumentReference } from '@angular/fire/compat/firestore';

export default interface IProduct {
  id?: string;
  Category?: String;
  CategoryAr?: string;
  Description?: string;
  DescriptionAr?:string;
  Image?: string;
  Name?: string;
  NameAr: string;
  Price?: number;
  Quantity?: number;
  Rank: number;
  SellerID: DocumentReference;
  Size?: string;
}
