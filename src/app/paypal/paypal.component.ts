import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'],
})
export class PaypalComponent implements OnInit {
  constructor() {
    render({
      id: '#payment',
      currency: 'USD',
      onApprove: (details) => {
        console.log(details);

        alert('success');
      },
      value: '100.00',
    });
  }

  ngOnInit(): void {}
}
