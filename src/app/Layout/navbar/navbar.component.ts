import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, combineLatest } from 'rxjs';
import { CartServiceService } from './../../Services/cart-service.service';
import { ProductsService } from 'src/app/Services/products.service';
import IProduct from 'src/app/ViewModels/Iproduct';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  sideBarOpen: boolean = false;
  searchitem: string = '';
  private startat = new Subject<string>();
  private endat = new Subject<string>();
  private startobservable = this.startat.asObservable();
  private endobservable = this.endat.asObservable();
  filtteredProducts: IProduct[] = [];
  private lastKeyPress: number = 0;
  itemIncart!: number;
  constructor(
    private ProductsService: ProductsService,
    private db: AngularFirestore,
    private cartServc: CartServiceService
  ) {}

  ngOnInit(): void {
    this.cartServc.cartItems.subscribe((el) => {
      this.itemIncart = el.length;
    });
    combineLatest([this.startobservable, this.endobservable]).subscribe(
      (value) => {
        this.ProductsService.SearchQuery(value[0], value[1]).subscribe(
          (items) => {
            console.log(items);

            this.filtteredProducts = items;
          }
        );
      }
    );
  }
  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  search() {
    this.startat.next(this.searchitem);
    this.endat.next(this.searchitem + '\uf8ff');
  }
}
