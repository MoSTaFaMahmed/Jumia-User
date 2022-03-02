import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/Services/Products/products.service';
import { Category } from './../ViewModels/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 categorys:Category[]=[];
catObservable?:Subscription;
flag:string=''
  constructor(private prodServc:ProductsService) { }

  ngOnInit(): void {
    this.prodServc.lang.subscribe((e) => {
      this.flag = e;
    });
this.catObservable=this.prodServc.getAllCategorys().subscribe(data=>{
  this.categorys= data.map((elemnt) => {
    // console.log(elemnt);
     return {
       id: elemnt.payload.doc.id,
       ...elemnt.payload.doc.data()as Category
       // name:elemnt.payload.doc.data['name']
     }

     //
   })
})
  }

}
