import { CartComponent } from './cart/cart.component';
import { CateqoryComponent } from './cateqory/cateqory.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './Search-Result/search-result/search-result.component';
import { UserRegisterComponent } from './user-register/user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';

import { AuthGuardService } from './Services/Guards/auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo: '/Products', pathMatch: 'full' },
  { path: 'Products', component: HomeComponent },
  { path: 'Products/:id', component: ProductDetailsComponent },
  { path: 'category', component: CateqoryComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'Register', component: UserRegisterComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'cart', component: CartComponent },

  {path:"**",component:ProductDetailsComponent}


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
