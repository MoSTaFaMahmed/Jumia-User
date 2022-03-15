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
  cartFir: ICart[] = [];
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

    this.auth.User.subscribe((login) => {
      if (login == true) {
        this.cartservce
          .getCartDtataFireStor(localStorage.getItem('uid'))
          .subscribe((el) => {
            this.items = el.map((elemnt: any) => {
              console.log(elemnt.payload.doc.data());
              return {
                idd: elemnt.payload.doc.id,
                ...(elemnt.payload.doc.data() as ICart),
              };
            });
           console.log(this.items);
           
          });
      }
      else if(login==false){
        this.getdata();
      }
    });


  }
  getdata() {
    this.cartservce.cartItems.subscribe((data) => {
      console.log(data);

      this.items = data;

      if (this.items) this.getTotal(this.items);
    });
  }
  onDelete(index: number,idd:any) {
    this.alert = 'removed';
    setTimeout(() => {
      this.alert = '';
    }, 800);
    this.items.splice(index, 1);
    this.cartservce.setCartData(this.items);
    this.getTotal(this.items);
    console.log(this.items);
    this.cartservce.removeCartItemFirstore(idd);
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
      this.alert = 'updated';
      setTimeout(() => {
        this.alert = '';
      }, 800);
    }
  }
  suppTotal(item: ICart, index: number) {
    this.alert = 'updated';
    setTimeout(() => {
      this.alert = '';
    }, 800);
    this.cartservce.suppItem(item);
    this.cartservce.removeCartItemFirstore(this.cartFir[index].idd);
    // if (item.subtotal == 1) {
    //   this.onDelete(index);
    //   this.alert = 'removed';

    //   setTimeout(() => {
    //     this.alert = '';
    //   }, 800);
    // }
  }
}
