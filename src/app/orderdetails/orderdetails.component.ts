import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc } from 'firebase/firestore';
import { FeedbackService } from '../Services/FeedBack/feedback.service';
import { OrdersService } from '../Services/Orders/orders.service';
import { IFeedBack } from '../ViewModels/ifeed-back';
import { IOrder } from '../ViewModels/iorder';
import IProduct from '../ViewModels/Iproduct';
import { IProductOrder } from '../ViewModels/IProductOrder';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css'],
})
export class OrderdetailsComponent implements OnInit {
  productId: any;
  orders: IOrder = {} as IOrder;
  produtorderd: IProductOrder[] = [];

  constructor(
    private activateRouteServicse: ActivatedRoute,
    private orderSrvc: OrdersService,
    private feedBackServc: FeedbackService,
    private Firs: Firestore
  ) {}

  ngOnInit(): void {
    this.activateRouteServicse.paramMap.subscribe((paramMap) => {
      this.productId = paramMap.get('id');
      console.log(this.productId);
      this.orderSrvc
        .getOrderDetailsByID(this.productId)
        .subscribe((el: any) => {
          this.orders = el as IOrder;
          let ids: string[] = [];
          this.produtorderd = el.Product.map((element: any) => {
            return {
              ...element,
            };
          });
          el.Product.map((ele: any) => {
            ids.push(ele.Product_Id.id);
          });
          this.orderSrvc.getUserProducts(ids).subscribe((prod) => {
            this.produtorderd = prod.map((p, index) => {
              return {
                id: p.payload.doc.id,
                Product: p.payload.doc.data() as IProduct,
                ...this.produtorderd[index],
              };
            });
          });
        });
    });
  }

}
