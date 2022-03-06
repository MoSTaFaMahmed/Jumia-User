import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Authontication/auth.service';
import { UsersService } from '../Services/Users/users.service';
import IUser from '../ViewModels/IUser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  isUser: boolean = true;
   
  uid:any
  datainfo:any
  dataprofile={
    email:'',
    firstname:'',
    lastname:'',
    password:'',
    phone:'',
    id:'',
    product:''
  }

  constructor(
    private ps:UsersService,
    private fs :AngularFirestore,
    private as:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.as.user.subscribe((user) => {
      // console.log(user);
  
      user ? (this.isUser = true) : (this.isUser = false);
    });
    this.as.user.subscribe((param)=>{
      
      this.fs.collection("users").ref.doc(param?.uid).get().then((data)=>{
        console.log(data.data())
        this.datainfo=<IUser>data.data();
        this.dataprofile.email=this.datainfo.email,
        this.dataprofile.firstname=this.datainfo.firstname,
        this.dataprofile.lastname=this.datainfo.lastname,
        this.dataprofile.phone=this.datainfo.phone,
        this.dataprofile.password=this.datainfo.password
        this.dataprofile.product=this.datainfo.product
      
        
      })
    })
    
  }
 
  updateUserProfile(){
    this.as.user.subscribe((param)=>{
      this.fs.collection("users").doc(param?.uid).update({
        phone:this.dataprofile.phone,
        firstname:this.dataprofile.firstname,
        lastname:this.dataprofile.lastname
      }).then(()=>{
        
        window.location.reload()
      }
      )
      .catch(err=>{
        console.log(err)
      })
    console.log("updated")
      
    })
  
  }
  Logout() {
    this.as.Logout()
    this.router.navigate(['/Products']);
  }

   

}

