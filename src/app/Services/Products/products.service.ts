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
  }

  setLanguage(data: string) {
    localStorage.setItem('lang', JSON.stringify(data));
    this.lang.next(this.getLanguage());
  }
  getLanguage() {
    return JSON.stringify(localStorage.getItem('lang') || '');
  }

  getAllData() {
    return this.db.collection('Products').snapshotChanges();
  }
  getAllCategorys() {
    return this.db.collection<Category>('Category').snapshotChanges();
  }
  getAllDataByCat(cat: string) {
    this.router.navigate(['./category'], { queryParams: { query: cat } });
  }
  getDataByCategoryName(cat: string) {
    return this.db
      .collection('Products', (ref) => ref.where('Category', '==', cat))
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
  }
}
