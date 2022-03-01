<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import IProduct from '../ViewModels/Iproduct';

import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../Services/Cart/cart-service.service';

>>>>>>> 7f8ffd1d897ec033a102348b656f2b8db7a97710

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
<<<<<<< HEAD

  constructor() { }

  ngOnInit() {
=======
  items: IProduct[] = [];
  total: number = 0;
  constructor(private cartservce:CartServiceService) { }

  ngOnInit(): void {
    this.cartservce.cartItems.subscribe(data => {
      this.items = data;
      if(this.items) this.getTotal(this.items)
    })
  }
  onDelete(index: number) {
    this.items.splice(index, 1);
    this.cartservce.setCartData(this.items);
    this.getTotal(this.items)
  }
  validateInput(event: any, index: number) {
    const Quantity = +event.target.value;
    if (Quantity < 1) {
      event.target.value = this.items[index].Quantity
      return;
    }
    this.QtyUpdated(Quantity, index)
  }
  private QtyUpdated(Quantity: number, index: number) {
    this.items[index].Quantity = Quantity;
    this.cartservce.setCartData(this.items);
    this.getTotal(this.items)
  }
  getTotal(data:any){
    let subs=0;
    for(const item of data)
    subs +=item.Price*item.Quantity;
    this.total=subs;
>>>>>>> 7f8ffd1d897ec033a102348b656f2b8db7a97710
  }

}
