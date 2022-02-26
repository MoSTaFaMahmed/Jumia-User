import { Subscription } from 'rxjs';
import { doc } from 'firebase/firestore';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../Services/products.service';
import IProduct from '../ViewModels/Iproduct';
import { docData } from 'rxfire/firestore';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: IProduct[]=[];
  productObservable?:Subscription
  constructor(private prdService: ProductsService) {}

  ngOnInit() {
   this.productObservable= this.prdService.getAllData().subscribe(data => {
      this.products = data.map((elemnt) => {
        console.log(elemnt);
        return {
          id: elemnt.payload.doc.id,
          ...elemnt.payload.doc.data()as IProduct
          // name:elemnt.payload.doc.data['name']
        }

        //
      })

      console.log(this.products);
    })
  }
ngOnDestroy() {
this.productObservable!.unsubscribe()
}
// addToCart(id?:string){
//   console.log(id);
// }
}
