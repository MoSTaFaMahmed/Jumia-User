import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Services/Authontication/auth.service';
import { CartServiceService } from '../Services/Cart/cart-service.service';
import { ICart } from '../ViewModels/icart';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  errorMes?: string;
  islogin?: boolean;
  sub!: Subscription;
  CardData: ICart[] = [];
  constructor(
    private as: AuthService,
    private router: Router,
    private CertServc: CartServiceService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}
  login(form: any) {
    let data = form.value;
    this.as.login(data.email, data.password).subscribe(() => {
      if (localStorage.getItem('uid')) {
        this.sub = this.as
          .checkISuser(localStorage.getItem('uid')!)
          .subscribe((el) => {
            if (el.length <= 0) {
              localStorage.removeItem('uid');
              this.as.User.next(false);
              this.errorMes = 'this Email Not for user';
              this.sub.unsubscribe();
            } else if (el.length >= 1) {
              this.as.User.next(true);
              this.router.navigate(['/Products']);
              this.sub.unsubscribe();
              const ls = this.CertServc.getCartData();
              ls.map((e: ICart) =>
                this.CertServc.addToCartFirstor(localStorage.getItem('uid')!, e)
              );

              
              //this.CertServc.cartItems.next([]);
              // if (typeof ls !== 'undefined' && ls.length === 0) {
              //   this.CertServc.getCartDtataFireStor(
              //     localStorage.getItem('uid')
              //   ).subscribe((e) => {
              //     this.CardData = e.map((el) => {
              //       return {
              //         id: el.payload.doc.id,
              //         ...(el.payload.doc.data() as ICart),
              //       };
              //     });
              //     console.log(this.CardData);

              //     this.CertServc.setCartData(this.CardData);
              //   });
              // }
            }
          });
      } else {
        this.errorMes = this.as.errorMsg;
      }
    });
  }

  loginwithfb() {}
  // remember
  remember() {}
  // routing to regester page
  gotoReg() {
    this.router.navigate(['/Register']);
  }
  // log(){
  //   this.as.AuthLogin()
  // }
  // async logout(){
  //   await this.as.logout();
  //   localStorage.removeItem('remove item');
  // }
}
