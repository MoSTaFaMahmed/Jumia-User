import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../Services/Products/products.service';
import IProduct from '../ViewModels/Iproduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cateqory',
  templateUrl: './cateqory.component.html',
  styleUrls: ['./cateqory.component.css'],
})
export class CateqoryComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  productCatObservable?: Subscription;
  categoryName: any;
  flag:string=''
  constructor(
    private prdService: ProductsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.prdService.lang.subscribe((e) => {
      this.flag = e;
    });
    //Get Product By Category//
    this.router.queryParamMap.subscribe((param) => {
      this.categoryName = param.get('query');
      console.log(this.categoryName);
    });
    this.productCatObservable = this.prdService
      .getDataByCategoryName(this.categoryName)
      .subscribe((data) => {
        this.products = data.map((elemnt) => {
          console.log(elemnt);
          return {
            id: elemnt.payload.doc.id,
            ...(elemnt.payload.doc.data() as IProduct),
          };
        });

        console.log(this.products);
      });
  }
  ngOnDestroy() {
    this.productCatObservable!.unsubscribe();
  }
}
