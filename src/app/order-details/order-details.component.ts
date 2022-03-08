import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, Firestore } from '@angular/fire/firestore';
import { FeedbackService } from '../Services/FeedBack/feedback.service';
import { OrdersService } from '../Services/Orders/orders.service';
import { ProductsService } from '../Services/Products/products.service';
import { IFeedBack } from '../ViewModels/ifeed-back';

import { IOrder } from '../ViewModels/iorder';
import IProduct from '../ViewModels/Iproduct';
import { IProductOrder } from '../ViewModels/IProductOrder';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  id: any;
  orderdetails: IOrder = {};
  products: IProduct[] = [];
  order: IProductOrder[] = [];
  userrate: number = 0;
  constructor(
    private router: ActivatedRoute,
    private orderService: OrdersService,
    private prddetails: ProductsService,
    private feedbackService:FeedbackService,
    private db:Firestore
  ) {}
 

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {

      this.id = param.get('id');
      console.log(this.id);
      
      this.orderService.getOrderDetailsByID(this.id).subscribe((e: any) => {
        this.orderdetails = e as IOrder;
        console.log(this.orderdetails);

        let ids: string[] = [];
        this.order = e.Product.map((i: any) => {
          return { ...i };
        });
        e.Product.map((i: any) => {
           ids.push(i.Product_Id.id);
        });
        console.log(this.order);
        console.log(ids);

        this.orderService.getUserProducts(ids).subscribe((e) => {
          this.order = e.map((el,index) => {
            return {
              id: el.payload.doc.id,
              Product:(el.payload.doc.data() as IProduct),
              ...this.order[index]
            };
          });
        });
        console.log(this.order);
        
      });
    });
  }
  display(id: string) {
    //console.log(id);

    this.prddetails.updateRank(id).subscribe((e) => {
      

    })
  }
  SubmitfeedBack(feedback:string,prdID:string){
    console.log(feedback);
    var today = new Date();
    let data:IFeedBack={
       product_id:doc(this.db,'Products/'+ prdID),
       feedback:feedback,
       date: today.getMonth() +
       1 +
       '/' +
       today.getDate() +
       '/' +
       today.getFullYear(),
    }
console.log(data);

    this.feedbackService.addfeedback(data)
    

  }
}
