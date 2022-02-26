import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/Authontication/auth.service';
import IUser from 'src/app/ViewModels/IUser';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {}
  Signup(form: any) {
    console.log(form.value);

    //this.AuthService.Signup(email,password)
  }
}
