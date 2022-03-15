import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';
import IProduct from 'src/app/ViewModels/Iproduct';
import { BehaviorSubject, find, Subscription } from 'rxjs';
import { ICart } from 'src/app/ViewModels/icart';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  placeholder: ICart[] = [];
  sub!: Subscription;
  cartItems = new BehaviorSubject<ICart[]>([]);
  constructor(private db: AngularFirestore) {
    const ls = this.getCartData();

    if (ls) this.cartItems.next(ls);
  }

  addItem(product: IProduct) {
    if (localStorage.getItem('uid')) {
      this.sub = this.checkITem(
        localStorage.getItem('uid'),
        product.id
      ).subscribe((el) => {
        if (el.length > 0) {
          let doc = el.map((e) => {
            return {
              idd: e.payload.doc.id,
              subtotal: e.payload.doc.data()['subtotal']! + 1,
              ...(e.payload.doc.data() as ICart),
            } as ICart;
          });

          console.log(doc);
          this.sub.unsubscribe();
          console.log(doc);
          this.updatSupTotal(
            localStorage.getItem('uid'),
            doc[0].idd,
            doc[0].subtotal! + 1
          );
        } else {
          this.addToCartFirstor(localStorage.getItem('uid'), {
            ...product,
            subtotal: 1,
          });
        }
      });

      console.log(localStorage.getItem('uid'));
      const ls = this.getCartData();
      //  if (ls) {
      //    this.cartItems.next(ls);
      //   this.addToCartFirstor(localStorage.getItem('uid'),ls)
      //   }
    }
    const ls = this.getCartData();

    var exist: any;
    if (ls)
      exist = ls.findIndex((item: IProduct) => {
        return item.id == product.id;
      });

    console.log(exist);

    if (exist >= 0) {
      ls[exist].subtotal = ++ls[exist].subtotal;

      this.setCartData(ls);
    } else {
      if (ls) {
        console.log(ls);

        var prd = { ...product, SellerID: product.SellerID!.id, subtotal: 1 };
        console.log(prd);

        const newData = [...ls, prd];
        console.log(newData);

        this.setCartData(newData);
      } else {
        this.placeholder.push({ ...product, SellerID: product.SellerID!.id });
        this.setCartData(this.placeholder);
        this.cartItems.next(this.getCartData());
      }
    }
  }
  suppItem(product: IProduct) {
    const ls = this.getCartData();

    var exist: any;
    if (ls)
      exist = ls.findIndex((item: IProduct) => {
        return item.id == product.id;
      });

    console.log(exist);

    if (exist >= 0) {
      ls[exist].subtotal = --ls[exist].subtotal;

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
  addToCartFirstor(uid: any, cart: ICart) {
    this.db.collection(`users/${uid}/cart`).add(cart);
  }
  getCartDtataFireStor(uid: any) {
    return this.db.collection(`users/${uid}/cart`).snapshotChanges();
  }
  removeCartItemFirstore(did: any) {
    console.log(localStorage.getItem('uid'));
    return this.db
      .doc(`users/${localStorage.getItem('uid')}/cart/${did}`)
      .delete();
  }

  checkITem(uid: any, cartID: any) {
    return this.db
      .collection<ICart>(`users/${uid}/cart`, (ref) =>
        ref.where('id', '==', cartID)
      )
      .snapshotChanges();
  }

  updatSupTotal(uid: any, docID: any, st: any) {
    console.log(st);

    this.db.collection(`users/${uid}/cart`).doc(docID).update({
      subtotal: st,
    });
  }
}
