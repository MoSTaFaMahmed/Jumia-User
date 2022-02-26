import { BehaviorSubject } from 'rxjs';
import { CartServiceService } from './../../Services/cart-service.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import IProduct from 'src/app/ViewModels/Iproduct';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit,OnChanges {
itemIncart!:number;
  constructor(private cartServc:CartServiceService) {

  }
  ngOnChanges(): void {
    // console.log(this.cartServc.num.length);
    // this.cartServc.numlenght.subscribe(el=>{
    //   console.log(el);
    // })
  }

  ngOnInit(): void {
   // console.log(localStorage.getItem('cart')?.length);
   // console.log(this.cartServc.num.length);
    this.cartServc.cartItems.subscribe(el=>{
     this.itemIncart=el.length;
    })
  }

}
