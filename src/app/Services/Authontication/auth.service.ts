import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private Auth: AngularFireAuth) {}
  Signup(email: string, password: string) {
    return this.Auth.createUserWithEmailAndPassword(email, password);
  }
  
}
