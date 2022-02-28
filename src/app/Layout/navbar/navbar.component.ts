import {
  Component,
  OnInit,
} from '@angular/core';

import { Subject, combineLatest } from 'rxjs';
import { CartServiceService } from './../../Services/Cart/cart-service.service';
import { ProductsService } from 'src/app/Services/Products/products.service';
import IProduct from 'src/app/ViewModels/Iproduct';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authontication/auth.service';
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
  private endat = new Subject<string>();
  private startobservable = this.startat.asObservable();
  private endobservable = this.endat.asObservable();
  filtteredProducts: IProduct[] = [];
  itemIncart!: number;
  constructor(
    private ProductsService: ProductsService,
    private cartServc: CartServiceService,
    private router: Router,
    private auth: AuthService
  ) {}
 

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      console.log(user);
      
      user ? (this.isUser = true) : (this.isUser = false);
    });
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
  route(dd: any) {
    this.router.navigate(['/search'], { queryParams: { word: dd } });
  }
  Logout(){
    this.auth.Logout();
  }
}
