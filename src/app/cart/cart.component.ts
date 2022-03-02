import { Component, OnInit } from '@angular/core';

import IProduct from '../ViewModels/Iproduct';

import { CartServiceService } from '../Services/Cart/cart-service.service';
import { ProductsService } from '../Services/Products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: IProduct[] = [];
  total: number = 0;
  flag:string='';
  constructor(private cartservce: CartServiceService, private prdService:ProductsService) {}

  ngOnInit(): void {
    this.prdService.lang.subscribe((e) => {
      this.flag = e;
    });
    this.cartservce.cartItems.subscribe((data) => {
      this.items = data;
      if (this.items) this.getTotal(this.items);
    });
  }
  onDelete(index: number) {
    this.items.splice(index, 1);
    this.cartservce.setCartData(this.items);
    this.getTotal(this.items);
  }
  validateInput(event: any, index: number) {
    const Quantity = +event.target.value;
    if (Quantity < 1) {
      event.target.value = this.items[index].Quantity;
      return;
    }
    this.QtyUpdated(Quantity, index);
  }
  private QtyUpdated(Quantity: number, index: number) {
    this.items[index].Quantity = Quantity;
    this.cartservce.setCartData(this.items);
    this.getTotal(this.items);
  }
  getTotal(data: any) {
    let subs = 0;
    for (const item of data) subs += item.Price * item.Quantity;
    this.total = subs;
  }
}
