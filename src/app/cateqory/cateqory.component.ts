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
<<<<<<< HEAD
  productObservable?: Subscription;
  constructor(private prdService: ProductsService) {}
  ngOnInit() {
    this.productObservable = this.prdService
      .getAllDataByCat('Fashion')
      .subscribe((data) => {
        this.products = data.map((elemnt) => {
          console.log(elemnt);
          return {
            id: elemnt.payload.doc.id,
            ...(elemnt.payload.doc.data() as IProduct),
          };
        });
      });
=======
  productCatObservable?: Subscription;
  categoryName:any;
  constructor(private prdService: ProductsService,private router:ActivatedRoute) {}

  ngOnInit() {
    //Get Product By Category//
  this.router.queryParamMap.subscribe((param)=>{
    this.categoryName=param.get('query')
     console.log(this.categoryName);
    })
     this.productCatObservable = this.prdService
       .getDataByCategoryName(this.categoryName)
       .subscribe((data) => {
         this.products = data.map((elemnt) => {
           console.log(elemnt);
           return {
             id: elemnt.payload.doc.id,
             ...(elemnt.payload.doc.data() as IProduct),
           };

           //
         });

         console.log(this.products);
       });
>>>>>>> 7f8ffd1d897ec033a102348b656f2b8db7a97710
  }
  ngOnDestroy() {
    this.productCatObservable!.unsubscribe();
  }
}
