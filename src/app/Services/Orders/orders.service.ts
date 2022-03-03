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
  AddOrder(orderdata: IOrder): any {
    return this.firestore.collection('Orders/').add({ ...orderdata });
  }
  // AddOrder(orderdata: IOrder){
  //   const ref:any=collection(this.firestore,'Orders');
  //   return addDoc(ref,orderdata);
  // }
}
