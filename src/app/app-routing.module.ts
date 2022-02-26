import { CateqoryComponent } from './cateqory/cateqory.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
const routes:Routes=[
  {path:'',redirectTo:'/Products',pathMatch:'full'},
  {path:'Products',component:HomeComponent},
  {path:'Products/:id',component:ProductDetailsComponent},
  {path:'category',component:CateqoryComponent},
   {path:"**",component:ProductDetailsComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
