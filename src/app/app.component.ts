import { Component, OnInit } from '@angular/core';
import { ProductsService } from './Services/Products/products.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'UserProject';
  flag: string = '';
  constructor(private prdServic: ProductsService) {}
  ngOnInit(): void {
<<<<<<< HEAD
    this.prdServic.lang.subscribe((e) => {
=======
      this.prdServic.lang.subscribe((e) => {
>>>>>>> 3460f746aab4e26594201b3702dce2badc7e4e55
      this.flag = e;
    });
  }
}
