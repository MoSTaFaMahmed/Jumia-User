import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/Authontication/auth.service';
import { OrdersService } from '../Services/Orders/orders.service';
import { IOrder } from '../ViewModels/iorder';
import IProduct from '../ViewModels/Iproduct';
import { IProductOrder } from '../ViewModels/IProductOrder';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  orders!: IOrder[];
  userID: any;
  productorder: IProductOrder[] = [];
  products: IProduct[] = [];
  constructor(
    private orderService: OrdersService,
    private auth: AuthService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.userID = param.get('id');

      this.orderService.getUserOrders(this.userID)
      .subscribe((order) => {
        this.orders = order.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as IOrder),
          };
        });
      
       
        
      });
    });
  }
}
