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
import { IProductOrder } from 'src/app/ViewModels/IProductOrder';
import { doc, Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  lang = new BehaviorSubject('');
  products = new BehaviorSubject<IProduct[]>([]);
  constructor(
    private db: AngularFirestore,
    private router: Router,
    private firs: Firestore
  ) {
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
        ref.where('Quantity', '>=', 20).orderBy('Quantity')
      )
      .snapshotChanges();
  }
  getLowQntData() {
    return this.db
      .collection('Products', (ref) =>
        ref.where('Quantity', '<', 20).where('Quantity', '>',0).orderBy('Quantity')
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
    console.log(start);

    return this.db
      .collection<IProduct>('Products', (ref) =>
        ref.where('searchKey', 'array-contains', start)
      )
      .snapshotChanges();
  }
  getProductbyRef(ids: string[]) {
    return this.db
      .collection<IProduct>('Products', (ref) =>
        ref.where(fir.default.firestore.FieldPath.documentId(), 'in', ids)
      )
      .valueChanges()
      .subscribe((e) => {
        this.products.next(e);
      });
  }
  // updateRank(id: string) {
  //   return this.db.collection<IProduct>('Products').doc(id).valueChanges();
  // }

  /////////******FEEDBACK*****////////
  getPrroductFeedBack(Prodid:any) {
    return this.db.collection<IProductOrder>('ProductsFeedback', (ref) =>
      ref.where('product_id', '==',doc(this.firs,'Products/'+Prodid))
    ).valueChanges()
  }
}
