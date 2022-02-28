import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  from, Observable } from 'rxjs';
import auth2 from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userID!: string;
  userEmail!: string | null;
  errorMsg: string = '';
  isUser: boolean = false;
  user!: Observable<firebase.default.User | null>;
  constructor(private auth: AngularFireAuth) {
    this.user = auth.user;
  }

  Signup(email: string, password: string) {
    return from(
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
          this.user.subscribe(() => (this.isUser = true));
          this.userID = e.user!.uid;
        })
        .catch(() => {
          this.user.subscribe(() => (this.isUser = false));
          this.errorMsg = 'Email Already Exist';
        })
    );
  }
  LoginFacebook() {
    return from(
      this.auth
        .signInWithPopup(new auth2.auth.FacebookAuthProvider())
        .then((e) => {
          console.log(e);

          this.userID = e.user!.uid;
        })
        .catch(() => (this.errorMsg = 'Email Already Exist'))
    );
  }

  login(email: string, password: string) {
    return from(
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((e) => {
          console.log(this.user);

          this.userID = e.user!.uid;
          this.userEmail = e.user!.email;
        })
        .catch((error) => (this.errorMsg = error.message))
    );
  }
  async Logout() {
    await this.auth.signOut();
    console.log(this.user);
  }
}
