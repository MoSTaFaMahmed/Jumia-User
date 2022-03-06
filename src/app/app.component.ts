import { Component, OnInit } from '@angular/core';
import { ProductsService } from './Services/Products/products.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'UserProject';
  flag: string = 'ltr';
  constructor(private prdServic: ProductsService) {}
  ngOnInit(): void {
      this.prdServic.lang.subscribe((e) => {
      this.flag = e;
    });
  }
}
