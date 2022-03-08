import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';
import auth2 from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as fir from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userID!: string;
  userEmail!: string | null;
  errorMsg: string = '';
  isUser: boolean = false;
  user!: Observable<firebase.default.User | null>;
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
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
  checkuser(id: string) {
    return this.db
      .collection('users', (ref) =>
        ref.where(fir.default.firestore.FieldPath.documentId(), '==', id)
      )
      .valueChanges();
  }
}
