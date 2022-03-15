export interface IOrder {
  buyer?: any;
  id?: string;
  Product?:
    | [
        {
          Product_Id?: any;
          Product_Quntity?: number;
          Total_Price?: number;
          Seller_ID?:any,
          deliveredstatus?:string
        }
      ]
    | any;
  Total?: number;
  date?: string;
  
}
