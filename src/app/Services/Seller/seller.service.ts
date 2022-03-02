import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, from } from 'rxjs';
import IUser from 'src/app/ViewModels/IUser';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  seller = new BehaviorSubject<IUser>({});
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
        this.seller.next(s.data() as IUser);
      })

      
    );
  }
}
