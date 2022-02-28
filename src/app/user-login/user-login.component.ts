import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Authontication/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  errorMes?: string;
  islogin?: boolean;

  constructor(private as: AuthService, private router: Router) {}

  ngOnInit(): void {}
  login(form: any) {
    let data = form.value;

    return this.as.login(data.email, data.password).subscribe(() => {
      if (this.as.user) {
        let id = this.as.userID;
        let email = this.as.userEmail;
        localStorage.setItem(JSON.stringify(email), JSON.stringify(id));

        this.router.navigate(['/Products']);
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
