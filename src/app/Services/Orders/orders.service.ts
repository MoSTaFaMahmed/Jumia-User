import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/ViewModels/iorder';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartServiceService } from '../Cart/cart-service.service';
import { doc, Firestore } from '@angular/fire/firestore';
import * as fir from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private firestore: AngularFirestore,
    private cartservice: CartServiceService,
    private db: Firestore
  ) {
    // this.orderRef = firestore.collection(this.dbpath);
  }
  AddOrder(orderdata: IOrder) {
    return this.firestore.collection('Orders/').add({ ...orderdata });
  }
  ClearLocalStorage() {
    localStorage.removeItem('cart');
    this.cartservice.cartItems.next([]);
  }
  updatQtn(id: any, qtn: any) {
    this.firestore.collection('Products').doc(id).update({
      Quantity: qtn,
    });
  }
  getUserOrders(uid: string) {
    return this.firestore
      .collection('Orders', (ref) =>
        ref.where('buyer', '==', doc(this.db, 'users/' + uid))
      )
      .snapshotChanges();
  }
  getUserProducts(ids: string[]) {
    console.log(ids);

    return this.firestore
      .collection('Products', (ref) =>
        ref.where(fir.default.firestore.FieldPath.documentId(), 'in', ids)
      )
      .snapshotChanges();
  }
  getOrderDetailsByID(id: string) {
    
    return this.firestore.collection('Orders').doc(id).valueChanges();
  }
  
  
}
