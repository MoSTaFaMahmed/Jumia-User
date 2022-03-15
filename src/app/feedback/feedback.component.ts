import { Component, OnInit } from '@angular/core';
import { doc } from 'firebase/firestore';
import { FeedbackService } from '../Services/FeedBack/feedback.service';
import { IFeedBack } from '../ViewModels/ifeed-back';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
})
export class FeedbackComponent implements OnInit {
  productId!: any;
  flag!: boolean;
  constructor(
    private feedBackServc: FeedbackService,
    private Firs: Firestore,
    private activateRouteServicse: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRouteServicse.paramMap.subscribe((paramMap) => {
      this.productId = paramMap.get('id');
      this.feedBackServc
        .checkFeedBack(localStorage.getItem('uid'), this.productId)
        .subscribe((el) => {
          if (el.length > 0) {
            this.flag = false;
          } else {
            this.flag = true;
          }
        });
    });
  }
  submitBack(feedback: string) {
    var today = new Date();
    let data: IFeedBack = {
      date:
        today.getMonth() +
        1 +
        '/' +
        today.getDate() +
        '/' +
        today.getFullYear(),
      product_id: doc(this.Firs, 'Products/' + this.productId),
      feedback: feedback,
      userID: localStorage.getItem('uid'),
    };
    this.feedBackServc.addfeedback(data);
  }
}
