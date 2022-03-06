import { Component, OnInit } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { CartServiceService } from '../Services/Cart/cart-service.service';
import { ProductsService } from '../Services/Products/products.service';
import { ICart } from '../ViewModels/icart';
import { IOrder } from '../ViewModels/iorder';
import { OrdersService } from '../Services/Orders/orders.service';
import { AuthService } from '../Services/Authontication/auth.service';
import { SellerService } from '../Services/Seller/seller.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  alert: string = '';
  items: ICart[] = [];
  total: number = 0;
  flag: string = '';
  subtotal!: number;
  order!: IOrder;
  ids!: any[];
  constructor(
    private cartservce: CartServiceService,
    private prdService: ProductsService,
    private orderService: OrdersService,
    private db: Firestore,
    private auth: AuthService,
    private sellerService: SellerService
  ) {}

  ngOnInit(): void {
    this.prdService.lang.subscribe((e) => {
      this.flag = e;
    });
    this.getdata();
  }
  getdata() {
    this.cartservce.cartItems.subscribe((data) => {
      console.log(data);

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
    for (const item of data) subs += item.Price * item.subtotal;
    this.total = subs;
  }
  updatetotal(p: ICart) {
    this.cartservce.addItem(p);
  }
//   PlaceOrder(items: ICart[]) {
// console.log(items);

//    items.map(e=>{
//      console.log(e.SellerID);

//     //  this.sellerService.getSeller(e.SellerID).subscribe(e=>{
//     //    this.sellerService.seller.subscribe(el=>{
//     //      console.log(el);

//     //    })
//     //  })

//    })
//     var today = new Date();
//     this.order = {
//       Total: this.total,
//       buyer: doc(this.db, 'users/' + this.auth.userID),
//       Product: items.map((e, index) => ({
//         Product_Id: doc(this.db, 'Products/' + e.id),
//         Total_Price: e.subtotal! * e.Price!,
//         Product_Quntity: e.subtotal,
//         sellerID:e.SellerID
//       })),
//       date:
//         today.getMonth() +
//         1 +
//         '/' +
//         today.getDate() +
//         '/' +
//         today.getFullYear(),
//     };
// console.log(this.order);

//     ////////////navigate to raring ////////////
//       this.orderService.AddOrder(this.order).then(() => {
//         this.orderService.ClearLocalStorage();
//       });
//      this.getdata();
//   }
  updateTotal(item: ICart) {
    if (item.Quantity! > item.subtotal!) {
      this.cartservce.addItem(item);
      this.alert = '';
      setTimeout(() => {
        this.alert = 'updated';
      }, 100);
      
    }
  }
  suppTotal(item: ICart, index: number) {
    setTimeout(() => {
      this.alert = 'updated';
    }, 500);
    this.cartservce.suppItem(item);
    if (item.subtotal == 1) {
      this.onDelete(index);
      this.alert = '';
      setTimeout(() => {
        this.alert = 'removed';
      }, 500);
    }
   
  }
}
