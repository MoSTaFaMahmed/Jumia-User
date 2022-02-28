import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Injectable } from '@angular/core';
import IProduct from 'src/app/ViewModels/Iproduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
 // cartItems: IProduct[] = [];
 // cartnum!:number;
  placeholder:IProduct[] = [] ;
 // num:[]=[];

 cartItems=new BehaviorSubject([])
  constructor(private db: AngularFirestore) {
  // const ls=JSON.parse(localStorage.getItem("cart")||'[]' );
  const ls=this.getCartData()
  if(ls) this.cartItems.next(ls)

   }



  addItem(product: IProduct) {
   //const ls=JSON.parse(localStorage.getItem("cart")||'[]' );
   const ls=this.getCartData()
 var exist:any;
   if(ls)
   exist=ls.find((item:IProduct)=>{
      return item.Name==product.Name;
    });
    console.log(exist);

    if (exist){
       exist.Quantity+1
       alert(exist.Quantity+1)
     // localStorage.setItem('cart',JSON.stringify(ls));
    this.setCartData(ls)
    }
 else{
   if(ls){
    const newData=[...ls,product];
    //localStorage.setItem('cart',JSON.stringify(newData));
    this.setCartData(newData)
    //this.cartItems.next(JSON.parse(localStorage.getItem('cart')||'[]'))

   }else{
     this.placeholder.push(product);
    //localStorage.setItem("cart", JSON.stringify(ls));
        this.setCartData(this.placeholder)
         this.cartItems.next(this.getCartData())
   }
}



    //  const exist=this.cartItems.find((item)=>{
    //     return item.id===product.id;
    //   });


  }


  setCartData(data:any){
    localStorage.setItem("cart",JSON.stringify(data));
    this.cartItems.next(this.getCartData())
  }
  getCartData(){
    return JSON.parse(localStorage.getItem('cart')||'[]')
  }
}
