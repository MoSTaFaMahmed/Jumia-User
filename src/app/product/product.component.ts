import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../Services/Products/products.service';
import IProduct from '../ViewModels/Iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  productObservable?: Subscription;
  constructor(private prdService: ProductsService) {}

  ngOnInit() {
    this.productObservable = this.prdService
      .getAllDataByCat('Fashion')
      .subscribe((data) => {
        this.products = data.map((elemnt) => {
        //  console.log(elemnt);
          return {
            id: elemnt.payload.doc.id,
            ...(elemnt.payload.doc.data() as IProduct),
            // name:elemnt.payload.doc.data['name']
          };

          //
        });

       // console.log(this.products);
      });
  }
  ngOnDestroy() {
    this.productObservable!.unsubscribe();
  }
}
