import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { async } from '@firebase/util';
import { BehaviorSubject, from } from 'rxjs';
import IProduct from 'src/app/ViewModels/Iproduct';
import IUser from 'src/app/ViewModels/IUser';
import { doc, Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  seller = new BehaviorSubject<IUser>({});
  //products = new BehaviorSubject<IProduct>();
  products: IProduct[] = [];
  constructor(private db: AngularFirestore, private fs: Firestore) {}

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
    return this.db.collection<IUser>('Seller').doc(id).valueChanges();
  }
  registerSeller(id: string, seller: IUser) {
    console.log('id');
    console.log(id);

    return this.db.doc('Seller/' + id).set(seller);
  }
  getSellerProducts(id: string) {
    return this.db
      .collection('Products', (ref) =>
        ref.where('SellerID', '==', doc(this.fs, 'Seller/' + id))
      )
      .valueChanges();
  }
}
