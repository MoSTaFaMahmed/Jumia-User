import { CartServiceService } from './../Services/Cart/cart-service.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../Services/Products/products.service';
import IProduct from '../ViewModels/Iproduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId:any;
  product: any;
  products:IProduct[]=[]
  categoryName:any;
  productCatObservable?:Subscription;
  productObservable!:Subscription;
    add:number=-1;
    flag:boolean=true;
    num!:number;

  constructor(
    private activateRouteServicse: ActivatedRoute,
    private productServc: ProductsService,
    private cartServc:CartServiceService,
    private router:Router
  ) {

  }

  ngOnInit(): void {
//******** */Get category of selected product***********//
    this.activateRouteServicse.queryParamMap.subscribe((param)=>{
      this.categoryName=param.get('query')
  console.log(this.categoryName);
   })

   this.productCatObservable = this.productServc
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

//*****Get Selected product******//
    this.activateRouteServicse.paramMap.subscribe((paramMap) => {
      this.productId=paramMap.get('id');
      console.log(this.productId);
      this.productServc.getProductById(this.productId).subscribe((prod) => {
       // this.product =prod.payload.data()
        this.product =prod;
      });
    });

  }
   backToProd(){
    this.router.navigate(['/Products'])
   }
  //  addToCart(){
  //     console.log(this.productId);
  //     this.flag=true;
  //  }
   buy(qtn:any){

   }

  addToCart(product:IProduct){
    this.cartServc.addItem(product)
    this.flag=false;
      }
  // addToCart(product:IProduct){
  //   let prodArr = JSON.parse(localStorage.getItem("products") || "[]");
  //      prodArr.push(product);
  //   localStorage.setItem("products", JSON.stringify(prodArr));
  //   console.log(this.cartServc.num.length);
  // }

}

