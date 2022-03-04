import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/ViewModels/iorder';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private firestore: AngularFirestore) {
    // this.orderRef = firestore.collection(this.dbpath);
  }
  AddOrder(orderdata: IOrder) {
    return this.firestore.collection('Orders/').add({ ...orderdata });
  }
  ClearLocalStorage(){
    localStorage.removeItem('cart');

  }
}
