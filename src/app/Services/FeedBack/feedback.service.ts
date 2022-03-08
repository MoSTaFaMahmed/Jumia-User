import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor( private db :AngularFirestore) { }
  addfeedback(data:any){
  return  this.db.collection('ProductsFeedback').add({...data})
 }
}
