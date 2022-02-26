import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { catchError, Observable } from 'rxjs';
import IProduct from '../ViewModels/Iproduct';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private db: AngularFirestore) {}
  getAllData() {
    return this.db.collection('Products').snapshotChanges();
  }
  getAllDataByCat(cat:string) {
    return this.db.collection('Products',(ref)=>ref.where('Category','==',cat).limit(6)).snapshotChanges()
  }
  getProductById(productId:number)
  {
   return this.db.collection('Products').doc(`${productId}`).valueChanges(); //snapshotChanges();

  }

}
