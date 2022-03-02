import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../Services/Products/products.service';
import IProduct from '../ViewModels/Iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  @Input() sendProduct: any;
  flag: string = '';
  productObservable?: Subscription;
  constructor(private prdService: ProductsService) {}

  ngOnInit() {
    this.prdService.lang.subscribe((e) => {
      this.flag = e;
    });
    // this.productObservable = this.prdService
    //   .getAllData()
    //   .subscribe((data) => {
    //     this.products = data.map((elemnt) => {
    //     //  console.log(elemnt);
    //       return {
    //         id: elemnt.payload.doc.id,
    //         ...(elemnt.payload.doc.data() as IProduct),
    //         // name:elemnt.payload.doc.data['name']
    //       };
    //       //
    //     });
    //    // console.log(this.products);
    //   });
  }
  ngOnDestroy() {
    // this.productObservable!.unsubscribe();
  }
}
