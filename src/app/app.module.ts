import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { UserLoginComponent } from './user-login/user-login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SliderComponent } from './slider/slider.component';
import { SidadversingComponent } from './sidadversing/sidadversing.component';
import { ProductComponent } from './product/product.component';
import { StaticcomponentComponent } from './staticcomponent/staticcomponent.component';
import { ImageAdverstingComponent } from './image-adversting/image-adversting.component';
import { HomeOfficeProductsComponent } from './home-office-products/home-office-products.component';
import { CateqoryComponent } from './cateqory/cateqory.component';
import { SearchResultComponent } from './Search-Result/search-result/search-result.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { PaypalComponent } from './paypal/paypal.component';
import { SellerdataComponent } from './sellerdata/sellerdata.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserRegisterComponent,
    NavbarComponent,
    FooterComponent,
    ProductDetailsComponent,
    SidebarComponent,
    SliderComponent,
    SidadversingComponent,
    ProductComponent,
    StaticcomponentComponent,
    ImageAdverstingComponent,
    HomeOfficeProductsComponent,
    CateqoryComponent,
    SearchResultComponent,
    UserLoginComponent,
    CartComponent,
    PaypalComponent,
    SellerdataComponent,
    UserProfileComponent,
    FavouriteListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyABMSgpsBPB7_X2Yb6MP7BvyJ6Nsx29LCY',
      authDomain: 'jumia-1ff31.firebaseapp.com',
      projectId: 'jumia-1ff31',
      storageBucket: 'jumia-1ff31.appspot.com',
      messagingSenderId: '339082607573',
      appId: '1:339082607573:web:817bef3ff2a645c738db5c',
      measurementId: 'G-812PBEVC9Y',
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyABMSgpsBPB7_X2Yb6MP7BvyJ6Nsx29LCY',
        authDomain: 'jumia-1ff31.firebaseapp.com',
        projectId: 'jumia-1ff31',
        storageBucket: 'jumia-1ff31.appspot.com',
        messagingSenderId: '339082607573',
        appId: '1:339082607573:web:817bef3ff2a645c738db5c',
        measurementId: 'G-812PBEVC9Y',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
