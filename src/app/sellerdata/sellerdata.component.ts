import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductsService } from '../Services/Products/products.service';
import { SellerService } from '../Services/Seller/seller.service';
import IProduct from '../ViewModels/Iproduct';

@Component({
  selector: 'app-sellerdata',
  templateUrl: './sellerdata.component.html',
  styleUrls: ['./sellerdata.component.css'],
})
export class SellerdataComponent implements OnInit, AfterViewInit, OnDestroy {
  products!: IProduct[];

  productObservable?: Subscription;
  constructor(
    private activateRouteServicse: ActivatedRoute,
    private sellerService: SellerService,
    private productService: ProductsService
  ) {}
  ngOnDestroy(): void {
    this.productObservable?.unsubscribe();
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.productObservable =
     this.activateRouteServicse.paramMap.subscribe(
      (paramMap) => {
        var m = paramMap.get('id');

        this.sellerService.getSellerByID(m!).subscribe((e) => {


          var ids: string[] = [];

          e?.Products?.map((el) => {
            ids.push(el.Product_Id.id);
          });

          this.productService.getProductbyRef(ids);
          this.productService.products.subscribe((e) => {
            this.products = e;
          });
        });
      }
    );
  }
}
