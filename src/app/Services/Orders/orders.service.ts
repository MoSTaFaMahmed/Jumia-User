import { Injectable } from '@angular/core';
import { IOrder } from 'src/app/ViewModels/iorder';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CartServiceService } from '../Cart/cart-service.service';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private firestore: AngularFirestore,private cartservice:CartServiceService) {
    // this.orderRef = firestore.collection(this.dbpath);
  }
  AddOrder(orderdata: IOrder) {
    return this.firestore.collection('Orders/').add({ ...orderdata });
  }
  ClearLocalStorage(){
    localStorage.removeItem('cart');
    this.cartservice.cartItems.next([])
      
  }
}
