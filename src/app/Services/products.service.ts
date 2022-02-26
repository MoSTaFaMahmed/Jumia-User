import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAction } from '@angular/fire/compat/database';

import IProduct from '../ViewModels/Iproduct';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  items!: Observable<
    AngularFireAction<firebase.default.database.DataSnapshot>[]
  >;
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
  SearchQuery(start: string, end: string) {
    return this.db
      .collection<IProduct>('Products', (ref) =>
        ref
          .limit(5)
          .orderBy('Name')
          .where('Name', '>=', start)
          .where('Name', '<=', start + '~')
          .limit(10)
      )
      .valueChanges();
  }
}
