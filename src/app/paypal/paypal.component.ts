import { OrdersService } from './../Services/Orders/orders.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { render } from 'creditcardpayments/creditCardPayments';
import { CartServiceService } from '../Services/Cart/cart-service.service';
import { ICart } from '../ViewModels/icart';
import { IOrder } from '../ViewModels/iorder';
import { doc, Firestore } from '@angular/fire/firestore';
import { AuthService } from '../Services/Authontication/auth.service';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  items: ICart[] = [];
  total: number = 0;
  order!: IOrder;
  userID: any;
  //myString:string =this.total.toString();
  constructor(
    private router: Router,
    private cartservce: CartServiceService,
    private orderService: OrdersService,
    private db: Firestore,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.auth.user?.subscribe((id) => {
      this.userID = id?.uid;
      console.log(this.userID);
    });

    this.getdata();
    render({
      id: '#payment',
      currency: 'USD',
      onApprove: (details) => {
        console.log(details.status);
        // alert('thanks for  paying dear '+ details.payer.name.given_name);
        if (details.status == 'COMPLETED') {
          this.PlaceOrder(this.items);
        }
      },
      value: '5',
    });
  }

  getdata() {
    this.cartservce.cartItems.subscribe((data) => {
      console.log(data);

      this.items = data;

      if (this.items) this.getTotal(this.items);
    });
  }
  getTotal(data: any) {
    let subs = 0;
    for (const item of data) subs += item.Price * item.subtotal;
    this.total = subs;
  }
  PlaceOrder(items: ICart[]) {
    console.log(items);
    
    console.log(localStorage.getItem('uid'));
    var today = new Date();
    this.order = {
      Total: this.total,
      buyer: doc(this.db, 'users/' + localStorage.getItem('uid')),
      Product: items.map((e) => ({
        Product_Id: doc(this.db, 'Products/' + e.id),
        Total_Price: e.subtotal! * e.Price!,
        Product_Quntity: e.subtotal,
        Seller_ID: e.SellerID,
        deliveredstatus: 'pending',
      })),
      date:
        today.getMonth() +
        1 +
        '/' +
        today.getDate() +
        '/' +
        today.getFullYear(),
    };
    console.log(this.order);

    ////////////navigate to raring ////////////
    this.orderService.AddOrder(this.order).then(() => {
      this.orderService.ClearLocalStorage();
    });

    items.map((id) => {
      this.orderService.updatQtn(id.id, id.Quantity! - id.subtotal!);
    });
  }
}
