import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Authontication/auth.service';
import { UsersService } from 'src/app/Services/Users/users.service';
import IUser from 'src/app/ViewModels/IUser';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  errorMessage: string = '';
  IsLoggedByFacebook: boolean = false;
  constructor(
    private AuthService: AuthService,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  Signup(form: any) {
    console.log(form);

    let data: IUser = {
      Firstname: form.firstname,
      Lastname: form.lastname,
      Phone: form.phone,
      IsSeller: false,
    };
    this.AuthService.Signup(form.email, form.password).subscribe(() => {
      if (this.AuthService.IsLogged) {
        this.errorMessage = '';
        this.userService.AddUser(this.AuthService.userID, data).then(() => {
          this.router.navigate(['/Products']);
        });
      } else {
        this.errorMessage = this.AuthService.errorMsg;
      }
    });
  }
  SignupFacebook() {
    this.AuthService.LoginFacebook().subscribe(() => {
      if (this.AuthService.IsLoggedByFacebook) {
        this.errorMessage = '';
        this.IsLoggedByFacebook = this.AuthService.IsLoggedByFacebook;
      }
    });
  }
}
