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
  LowQntproducts: IProduct[] = [];
  productCatObservable?: Subscription;
  categoryName: any;
  flag:string='';
  isFillter:boolean=false
  min?:any
  max?:any
  minp?:any
  maxp?:any
  userName:any
  priceComp:IProduct[]=[]
  constructor(
    private prdService: ProductsService,
    private router: ActivatedRoute,
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

     this.isFillter=false
  }
  ngOnDestroy() {
    this.productCatObservable!.unsubscribe();
  }
  onSubmit() {
    let min = parseInt(this.min)
    let max=parseInt(this.max)
     
    // let m = this.min
  //  let  m= data.target.min.value
    // let min =parseInt(m)
    // console.log(min,max)
    this.router.queryParamMap.subscribe((param) => {
      this.categoryName = param.get('query');
      console.log(this.categoryName);


       this.prdService.getDataByCategoryPriceLimit(this.categoryName,min,max).subscribe(e=>{
        
        this.priceComp = e.map((elemnt) => {
          console.log("hy",elemnt);
          return {
            id: elemnt.payload.doc.id,
            ...(elemnt.payload.doc.data() as IProduct),
          };
        });
        console.log(this.priceComp)

        this.isFillter=true
      })
    });
  

 }
}
