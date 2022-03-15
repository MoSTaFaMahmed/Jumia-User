import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/Authontication/auth.service';
import { FavouriteListService } from '../Services/favourite/favourite-list.service';
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
    private  favouritService:FavouriteListService,
   
    private auth :AuthService,
    
  ) { }
  ngOnDestroy(): void {
    this.productObservable?.unsubscribe();
  }

  ngOnInit(): void {
    // let userID = this.auth.userID
    let userID =localStorage.getItem('uid')
    this.favouritService.getFavouriteItem(userID).subscribe((e:any)=>{
      this.products= e.map((el:any)=>{
        return{
          id : el.payload.doc.id,
          ...el.payload.doc.data()
        }
      })
    })  
  
  }
  delete(id:any){
    let userID =localStorage.getItem('uid')
    console.log( id)
    this.favouritService.deleteFav(userID,id)

  }
  
}
