import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import IProduct from '../../ViewModels/Iproduct';
import IUser from '../../ViewModels/IUser';
import { Router } from '@angular/router';
import { ICart } from 'src/app/ViewModels/icart';
import { Category } from 'src/app/ViewModels/category';
import { BehaviorSubject, from } from 'rxjs';
import * as fir from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  lang = new BehaviorSubject('');
  products = new BehaviorSubject<IProduct[]>([]);
  constructor(private db: AngularFirestore, private router: Router) {
    this.lang.next(this.getLanguage());
    this.lang.subscribe((e) => {
      console.log(e);
    });
  }

  setLanguage(data: string) {
    localStorage.setItem('lang', JSON.stringify(data));
    this.lang.next(this.getLanguage());
  }
  getLanguage() {
    return JSON.parse(localStorage.getItem('lang') || '');
  }
  // taqwa

  getAllData() {
    return this.db
      .collection('Products', (ref) =>
        ref

          .where('isAccepted', '==', true)
          .where('Quantity', '>=', 20)
          .orderBy('Quantity')
      )
      .snapshotChanges();
  }
  getLowQntData() {
    return this.db
      .collection('Products', (ref) =>
        ref
          .where('Quantity', '<', 20)
          .orderBy('Quantity')
          .where('isAccepted', '==', true)
          .limit(6)
      )
      .snapshotChanges();
  }
  getAllCategorys() {
    return this.db.collection<Category>('Category').snapshotChanges();
  }
  getAllDataByCat(cat: string) {
    this.router.navigate(['./category'], { queryParams: { query: cat } });
  }
  getDataByCategoryName(cat: string) {
    return this.db
      .collection('Products', (ref) =>
        ref
          .where('Category', '==', cat)
          .where('Quantity', '>=', 20)
          .orderBy('Quantity')
          .where('isAccepted', '==', true)
          .limit(6)
      )
      .snapshotChanges();
  }
  getLowQntDataByCategoryName(cat: string) {
    return this.db
      .collection('Products', (ref) =>
        ref
          .where('Category', '==', cat)
          .where('Quantity', '<', 20)
          .orderBy('Quantity')
          .where('isAccepted', '==', true)
          .limit(6)
      )
      .snapshotChanges();
  }
  getProductById(productId: number) {
    return this.db
      .collection<IProduct>('Products')
      .doc(`${productId}`)
      .valueChanges(); //snapshotChanges();
  }

  SearchQuery(start: string) {
    return this.db
      .collection<IProduct>('Products', (ref) =>
        ref
          .where('searchKey', 'array-contains', start)

          .limit(10)
      )
      .snapshotChanges();
  }
  getProductbyRef(ids: string[]) {
<<<<<<< HEAD
    return this.db
      .collection<IProduct>('Products', (ref) =>
        ref.where(fir.default.firestore.FieldPath.documentId(), 'in', ids)
      )
      .valueChanges()
      .subscribe((e) => {
        this.products.next(e);
      });
=======

    return this.db.collection<IProduct>('Products',
    (ref) =>
      ref.where(
        fir.default.firestore.FieldPath.documentId(),
        'in',
        ids
      )
    ).valueChanges().subscribe(e=>{
        this.products.next(e);
    })
>>>>>>> 3460f746aab4e26594201b3702dce2badc7e4e55
  }
}
