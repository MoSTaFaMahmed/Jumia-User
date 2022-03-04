import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';
import IProduct from 'src/app/ViewModels/Iproduct';
import { BehaviorSubject } from 'rxjs';
import { ICart } from 'src/app/ViewModels/icart';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  placeholder: ICart[] = [];

  cartItems = new BehaviorSubject([]);
  constructor(private db: AngularFirestore) {
    const ls = this.getCartData();

    if (ls) this.cartItems.next(ls);
  }

  addItem(product: ICart) {
    const ls = this.getCartData();
    console.log(ls);

    var exist: any;
    if (ls)
      exist = ls.findIndex((item: IProduct) => {
        return item.id == product.id;
      });

    console.log(exist);

    if (exist >= 0) {
      ls[exist].subtotal = ++ls[exist].subtotal;
      console.log(ls);

      this.setCartData(ls);
    } else {
      if (ls) {
        console.log(ls);

        var prd = { ...product, subtotal: 1 };
        const newData = [...ls, prd];
        console.log(newData);

        this.setCartData(newData);
      } else {
        this.placeholder.push(product);
        this.setCartData(this.placeholder);
        this.cartItems.next(this.getCartData());
      }
    }
  }

  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
    this.cartItems.next(this.getCartData());
  }
  getCartData() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
