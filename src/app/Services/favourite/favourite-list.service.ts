import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FavouriteListService {

  constructor(private db: AngularFirestore) { }


  addToFavourite(id:any,data:any){
    this.db.collection(`users/${id}/favourite`).add(data)
  }
   getFavouriteItem(id:any){
    return this.db.collection(`users/${id}/favourite`).snapshotChanges()
  }
  deleteFav(userId:any,proId:any){
    this.db.doc(`users/${userId}/favourite/${proId}`).delete()

  }
}
