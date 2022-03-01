import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IProduct from '../../ViewModels/Iproduct';
import IUser from '../../ViewModels/IUser';
import ITest from 'src/app/ViewModels/test';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = new BehaviorSubject<IProduct>({});

  constructor(private db: AngularFirestore) {}
  getAllData() {
    return this.db.collection('Products').snapshotChanges();
  }
  getAllDataByCat(cat: string) {
    return this.db
      .collection('Products', (ref) =>
        ref.where('Category', '==', cat).limit(6)
      )
      .snapshotChanges();
  }
  getProductById(productId: number) {
    return this.db.collection('Products').doc(`${productId}`).valueChanges(); //snapshotChanges();
  }

  SearchQuery(start: string) {
    return this.db
      .collection<IProduct>('Products', (ref) =>
        ref
          .where('searchKey', 'array-contains', start)

          .limit(10)
      )
      .valueChanges();
  }

  addproduct(word: ITest) {
    this.db.collection<ITest>('test').add({ ...word });
    console.log(word);
  }
  hhhh() {
    return this.db
      .collection<IUser>('users')
      .doc('GJdYZoixIgn7krJLNZWV')
      .get()
      .subscribe((res) => {
        var res2 = res.data();
        res2?.Product?.map((el) => {
          el.Product_Id.get().then((rr) => {
            // this.tt=  rr.data() as IProduct
            this.products.next(rr.data() as IProduct);
          });
        });
      });
  }
}
