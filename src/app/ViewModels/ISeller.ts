import { DocumentReference } from "@angular/fire/compat/firestore";

export interface ISeller {
   
    FirstName?:string,
    LastName?:string,
   CompanyName?:string,
    Email?:string,
    Rate:number,
    IsActive:boolean,
    IsNew:boolean,
    Password?:string,
    Phone?:string,
    Address?:[
        City?:string,
        Street?:string,
        BulNo?:number
    ],
    Payment?:[
        CreditCard?:string,
        CVV?:string,
        CardHolderName?:string
    ],
    Products?:[{Product_Id:DocumentReference}],
    Order?:[
        {Product?:any,
        Quantity?:number,
        UserName?:string,
        Date?:any,}
    ]
}
