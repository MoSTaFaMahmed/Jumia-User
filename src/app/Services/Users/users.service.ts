import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IUser from 'src/app/ViewModels/IUser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}
  AddUser(id: string, userdata: IUser) {
    
    return this.firestore.doc('users/' + id).set(userdata);
  }
}
