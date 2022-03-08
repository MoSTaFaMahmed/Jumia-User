import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/Authontication/auth.service';
import { ProductsService } from '../Services/Products/products.service';
import { SellerService } from '../Services/Seller/seller.service';
import { UsersService } from '../Services/Users/users.service';
import IProduct from '../ViewModels/Iproduct';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {
  products!: IProduct[];

  productObservable?: Subscription;

  constructor(
    private activateRouteServicse: ActivatedRoute,
    private userService:  UsersService,
    private productService: ProductsService,
    private auth :AuthService,
    private fs:AngularFirestore
  ) { }
  ngOnDestroy(): void {
    this.productObservable?.unsubscribe();
  }

  ngOnInit(): void {
    
  
    //  this.activateRouteServicse.paramMap.subscribe(
    //   (paramMap) => {
    //     var m = paramMap.get('id');
    //     console.log(m)
    const userId=this.auth.userID
    
     
  
      //   this.userService.getUserByID(this.auth.userID!).subscribe((e:any) => {
      //        console.log(e.data())

      //     var ids: string[] = [];

      //     e?.Product?.map((el) => {
      //       ids.push(el.Product_Id.id);
      //     });
          
      //     this.productService.getProductbyRef(ids);
      //     this.productService.products.subscribe((e) => {
      //       this.products = e;
      //     });
      //   });
      // }
  }
  
}
