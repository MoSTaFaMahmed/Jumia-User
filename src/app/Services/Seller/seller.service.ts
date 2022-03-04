import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { async } from '@firebase/util';
import { BehaviorSubject, from } from 'rxjs';
import IProduct from 'src/app/ViewModels/Iproduct';
import IUser from 'src/app/ViewModels/IUser';

@Injectable({
  providedIn: 'root',
})
export class SellerService  {
  seller = new BehaviorSubject<IUser>({});
  //products = new BehaviorSubject<IProduct>();
  products: IProduct[] = [];
  constructor(private db: AngularFirestore) {}

  // hhhh() {
  //   return this.db
  //     .collection<IUser>('users')
  //     .doc('GJdYZoixIgn7krJLNZWV')
  //     .get()
  //     .subscribe((res) => {
  //       var res2 = res.data();
  //       res2?.Product?.map((el) => {
  //         el.Product_Id.get().then((rr) => {
  //           // this.tt=  rr.data() as IProduct
  //           //  this.products.next(rr.data() as IProduct);
  //         });
  //       });
  //     });
  // }

  getSeller(sellerRef: DocumentReference) {
    return from(
      sellerRef.get().then((s) => {
        var seller = {
          sellerid: s.id,
          ...s.data(),
        };
        this.seller.next(seller as IUser);
      })
    );
  }
  getSellerByID(id: string) {
  return  this.db
      .collection<IUser>('users')
      .doc(id).valueChanges()
      

  }
  
  
}
