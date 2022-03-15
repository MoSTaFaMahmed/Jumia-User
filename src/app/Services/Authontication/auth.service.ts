import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import auth2 from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as fir from 'firebase/compat/app';
import { textChangeRangeIsUnchanged } from 'typescript';
import { Firestore, FirestoreError } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userID!: string;
  userEmail!: string | null;
  
  errorMsg: string = '';
  isUser: boolean = false;
  
  user!: Observable<firebase.default.User | null>;

  User=new BehaviorSubject <boolean>(false);
  userId=new BehaviorSubject<string>('');
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
   // this.user = this.auth.user;
    (localStorage.getItem('uid'))?this.User.next(true):this.User.next(false)
  }

  Signup(email: string, password: string) {
    return from(
      this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
          this.user?.subscribe(() => (this.User.next( true)));
          this.userID = e.user!.uid;
        })
        .catch(() => {
          this.user?.subscribe(() => (this.User.next( false)));
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
          
        })
        .catch(() => (this.errorMsg = 'Email Already Exist'))
    )
  }

  login(email: string, password: string) {
    return from(
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((e) => {
          localStorage.setItem('uid',e.user?.uid!)
          
           
        })
        .catch((error:FirestoreError) => (this.errorMsg =error.code))
    );
  }
  async Logout() {
    return await this.auth.signOut();
  
  }
  checkISuser(id: string) {
    return this.db
      .collection('users', (ref) =>
        ref.where(fir.default.firestore.FieldPath.documentId(), '==', id)
      )
      .valueChanges();
  }
}
