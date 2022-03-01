import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../Services/Products/products.service';
import IProduct from '../ViewModels/Iproduct';
@Component({
  selector: 'app-home-office-products',
  templateUrl: './home-office-products.component.html',
  styleUrls: ['./home-office-products.component.css']
})
export class HomeOfficeProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  productObservable?: Subscription;
  constructor(private prdService: ProductsService) {}

  ngOnInit() {
    // this.productObservable = this.prdService
    //   .getAllDataByCat('Home&Office')
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
    this.productObservable!.unsubscribe();
  }

}
