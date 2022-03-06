import { DocumentReference } from "@angular/fire/compat/firestore";

export default interface IUser{
    sellerid?:string,
    FirstName?:string,
    LastName?:string,
    Phone?:string,
    IsActive?:boolean,
    SellerStatus?:String
    Products?:[{Product_Id:DocumentReference}]

}
