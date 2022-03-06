import { CartServiceService } from './../Services/Cart/cart-service.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../Services/Products/products.service';
import IProduct from '../ViewModels/Iproduct';
import { SellerService } from '../Services/Seller/seller.service';
import IUser from '../ViewModels/IUser';
import { AuthService } from '../Services/Authontication/auth.service';
import { doc, Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: any;
  product!: IProduct;
  products: IProduct[] = [];
  categoryName: any;
  productCatObservable?: Subscription;
  productObservable!: Subscription;
  add: number = -1;
  flag: boolean = false;
  num!: number;
  seller!: IUser;
  flaglang: string = '';
  favList:[]=[];
  uid:any
  datainfo:any
  dataprofile={
    favorite:{},
  }
  favorite: any
  constructor(
    private activateRouteServicse: ActivatedRoute,
    private productServc: ProductsService,
    private cartServc: CartServiceService,
    private router: Router,
    private sellerServc: SellerService,
    private auth:AuthService,
    private db:Firestore,
    private fs :AngularFirestore,



  ) {}

  ngOnInit(): void {
    this.productServc.lang.subscribe((e) => {
      this.flaglang = e;
      console.log(this.flaglang);
    });
    //******** */Get category of selected product***********//
    this.activateRouteServicse.queryParamMap.subscribe((param) => {
      this.categoryName = param.get('query');
      console.log(this.categoryName);
    });
    /////////////////////////

    /////////////////////////
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
      this.productId = paramMap.get('id');
      console.log(this.productId);
      this.productServc.getProductById(this.productId).subscribe((prod) => {
        // this.product =prod.payload.data()

        this.sellerServc.getSeller(prod?.SellerID!).subscribe(() => {
          this.sellerServc.seller.subscribe((el) => {
            this.product = prod!;
            this.seller = el;
            console.log(this.seller);
          });
        });
      });
    });
  }
  backToProd() {
    this.router.navigate(['/Products']);
  }
  //  addToCart(){
  //     console.log(this.productId);
  //     this.flag=true;
  //  }
  buy(qtn: any) {}

  addToCart(product: IProduct) {

    console.log(product);

    this.cartServc.addItem(product);
    this.flag = true;
    setTimeout(() => {
      this.flag=false;
    }, 1500);
  }
  // addToCart(product:IProduct){
  //   let prodArr = JSON.parse(localStorage.getItem("products") || "[]");
  //      prodArr.push(product);
  //   localStorage.setItem("products", JSON.stringify(prodArr));
  //   console.log(this.cartServc.num.length);
  // }

  // ==================addtofavLise"taqwa"========================
  save(id:string){
    let userId=this.auth.userID
     this.fs.collection('users').doc(userId).update({
              favorite : ([{Product_Id:
              doc(this.db,"Products/"+id)}])
     })
     console.log("updated")

     console.log(this.dataprofile)

}
}
