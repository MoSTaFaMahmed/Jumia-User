import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/Authontication/auth.service';
import { SellerService } from '../Services/Seller/seller.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  NgForm,
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Firestore, doc } from '@angular/fire/firestore';
import IUser from '../ViewModels/IUser';
@Component({
  selector: 'app-seller-register',
  templateUrl: './seller-register.component.html',
  styleUrls: ['./seller-register.component.css'],
})
export class SellerRegisterComponent implements OnInit {
  public seller: any;
  errorMessage: string = '';
  public NewSeller: IUser = {} as IUser;
  SellerRegisForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private SellerServ: SellerService,
    private db: AngularFirestore,
    private firestore: Firestore,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.SellerRegisForm = new FormGroup({
      FirstName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]{3,}'),
      ]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]{3,}'),
      ]),
      CompanyName: new FormControl('', [
        Validators.required,
        Validators.pattern('[A-Za-z]{3,}'),
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}'),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]{6,}'),
      ]),
      Phone: new FormControl('', Validators.pattern('[0-9]{7,}')),
      Address: new FormGroup({
        City: new FormControl('', Validators.pattern('[A-Za-z]{3,}')),
        Street: new FormControl('', [Validators.required]),
        BulNo: new FormControl([
          Validators.required,
          Validators.pattern('[0-9]{1,}'),
        ]),
      }),
      Payment: new FormGroup({
        CreditCard: new FormControl('', Validators.pattern('[1-9]{9,}')),
        CVV: new FormControl('', [Validators.required]),
        CardHolderName: new FormControl('', [
          Validators.required,
          Validators.pattern('[A-Za-z]{3,}'),
        ]),
      }),
      Order: new FormArray([
        new FormGroup({
          Product: new FormControl(''),
          Quantity: new FormControl(0),
          UserName: new FormControl(''),
          Date: new FormControl(''),
        }),
      ]),
      Rate: new FormControl(0),
      IsActive: new FormControl(true),
      IsNew: new FormControl(true),
      Products: new FormArray([
        new FormGroup({
          Product_Id: new FormControl(
            doc(this.firestore, 'Products', 'xuw7NPQgRP2twaCSX7Sd')
          ),
        }),
      ]),
    });
    /////////////////////
  }
  get FirstName() {
    return this.SellerRegisForm.get('FirstName');
  }
  get LastName() {
    return this.SellerRegisForm.get('LastName');
  }
  get CompanyName() {
    return this.SellerRegisForm.get('CompanyName');
  }
  get Email() {
    return this.SellerRegisForm.get('Email');
  }
  get Password() {
    return this.SellerRegisForm.get('Password');
  }
  get Phone() {
    return this.SellerRegisForm.get('Phone');
  }
  get CreditCard() {
    return this.SellerRegisForm.get('CreditCard');
  }
  get CVV() {
    return this.SellerRegisForm.get('CVV');
  }
  get BulNo() {
    return this.SellerRegisForm.get('BulNo');
  }
  get City() {
    return this.SellerRegisForm.get('City');
  }
  get Street() {
    return this.SellerRegisForm.get('Street');
  }
  get CardHolderName() {
    return this.SellerRegisForm.get('CardHolderName');
  }

  Signup() {
    let SellerModel: IUser = this.SellerRegisForm.value as IUser;

    this.AuthService.Signup(
      SellerModel.Email!,
      SellerModel.Password!
    ).subscribe(() => {
      if (this.AuthService.userID) {
        this.errorMessage = '';
        this.SellerServ.registerSeller(
          this.AuthService.userID,
          SellerModel
        ).then(() => {
          this.router.navigate(['/Products']);
        });
      } else {
        this.errorMessage = this.AuthService.errorMsg;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      }
    });
  }
}
