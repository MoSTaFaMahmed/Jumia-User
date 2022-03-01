import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAction } from '@angular/fire/compat/database';

import IProduct from '../../ViewModels/Iproduct';
import IUser from '../../ViewModels/IUser';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private db: AngularFirestore,private router:Router) {}
  getAllData() {
    return this.db.collection('Products').snapshotChanges();
  }
  getAllCategorys() {
    return this.db.collection('Category').snapshotChanges();
  }
  getAllDataByCat(cat: string) {

    this.router.navigate(['./category'],{queryParams:{query:cat}})

  }
  getDataByCategoryName(cat: string){
      return this.db
      .collection('Products', (ref) =>
        ref.where('Category', '==', cat)
      )
      .snapshotChanges();
  }
  getProductById(productId: number) {
    return this.db.collection('Products').doc(`${productId}`).valueChanges(); //snapshotChanges();
  }
  getsellerById(productId: string) {
    return this.db.collection<IUser>('users')
    .doc(`${productId}`).valueChanges() ; //snapshotChanges();
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
