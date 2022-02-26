import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';
import auth2 from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  IsLogged: boolean = false;
  userID!: string;
  errorMsg: string = '';
   IsLoggedByFacebook:boolean=false;
  constructor(private auth: AngularFireAuth) {}
  Signup(email: string, password: string) {
    return from(
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
          this.userID = e.user!.uid;
          this.IsLogged = true;
        })
        .catch((error) => (this.errorMsg = error.message))
    );
  }
  LoginFacebook() {
    return from(
      this.auth
        .signInWithPopup(new auth2.auth.FacebookAuthProvider())
        .then((e) => {
          console.log(e);
          
          this.userID = e.user!.uid;
          this.IsLogged = true;
          this.IsLoggedByFacebook=true;
        }) .catch((error) => (this.errorMsg = error.message))
    );
  }
  Logout() {
    this.auth.signOut().then(() => (this.IsLogged = false));
  }
}
