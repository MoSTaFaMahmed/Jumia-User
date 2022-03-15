import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { doc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private db: AngularFirestore, private Firs: Firestore) {}
  addfeedback(data: any) {
    return this.db.collection('ProductsFeedback').add({ ...data });
  }

  checkFeedBack(uid: any, pid: any) {
  return  this.db.collection('ProductsFeedback', (ref) =>
      ref
        .where('product_id', '==', doc(this.Firs, 'Products/' + pid))
        .where('userID', '==', uid)
    ).valueChanges()
  }
}
