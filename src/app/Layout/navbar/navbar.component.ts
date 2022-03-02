import { Component, OnInit } from '@angular/core';

import { Subject, combineLatest, retry } from 'rxjs';
import { CartServiceService } from './../../Services/Cart/cart-service.service';
import { ProductsService } from 'src/app/Services/Products/products.service';
import IProduct from 'src/app/ViewModels/Iproduct';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authontication/auth.service';
import ITest from 'src/app/ViewModels/test';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  sideBarOpen: boolean = false;
  searchitem: string = '';
  islogged: boolean = false;
  isUser: boolean = false;
  private startat = new Subject<string>();
  private startobservable = this.startat.asObservable();
  filtteredProducts: IProduct[] = [];
  itemIncart!: number;
  words: ITest = {
    wrods: [],
  };
  prd!: IProduct;
  flag:string='';
  
  constructor(
    private ProductsService: ProductsService,
    private cartServc: CartServiceService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    /*   |||| reference  ||||  
    this.ProductsService.hhhh();
    this.ProductsService.products.subscribe((e) => (this.prd = e));
         |||| reference  |||| */
         this.ProductsService.lang.subscribe((e) => {
          this.flag = e;
        });
    this.auth.user.subscribe((user) => {
      console.log(user);

      user ? (this.isUser = true) : (this.isUser = false);
    });
    this.cartServc.cartItems.subscribe((el) => {
      this.itemIncart = el.length;
    });
    this.startobservable.subscribe((value) => {
      this.ProductsService.SearchQuery(value).subscribe((items) => {
        this.filtteredProducts = items.map((item) => {
          return item.payload.doc.data();
        });
        console.log(this.filtteredProducts);
      });
    });
  }
  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
  search() {
    setTimeout(() => {
      this.startat.next(this.searchitem);
    }, 900);
  }
  route(id: string) {
    this.filtteredProducts = [];
    this.searchitem = '';
    this.router.navigate(['/Products', id]);
  }
  changeDir(dir: string) {
    this.ProductsService.setLanguage(dir);
  }
  Logout() {
    this.auth.Logout();
  }
}
