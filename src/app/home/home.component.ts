import { Subscription } from 'rxjs';
import { doc } from 'firebase/firestore';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../Services/Products/products.service';
import IProduct from '../ViewModels/Iproduct';
import { docData } from 'rxfire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: IProduct[]=[];
  firstSecproduct: IProduct[]=[];
  secondSecproduct: IProduct[]=[];
  thirdSecproduct: IProduct[]=[];

  productObservable?:Subscription
  constructor(private prdService: ProductsService) {}

  ngOnInit() {
   this.productObservable= this.prdService.getAllData().subscribe(data => {
      this.products = data.map((elemnt) => {
       // console.log(elemnt);
        return {
          id: elemnt.payload.doc.id,
          ...elemnt.payload.doc.data()as IProduct
          // name:elemnt.payload.doc.data['name']
        }

        //
      })

      this.firstSecproduct=this.products.slice(0,6);
      this.secondSecproduct=this.products.slice(6,12);
      this.thirdSecproduct=this.products.slice(12,18);
    })


  }

ngOnDestroy() {
this.productObservable!.unsubscribe()
}
// addToCart(id?:string){
//   console.log(id);
// }
}
