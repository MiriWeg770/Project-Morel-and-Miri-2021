export class Product{
    constructor( 
         public productCode:number,
         public productName:string,
         public amountInMeal:number,
         public unitMeasureCode:number,
         public company:string,
         public mealCode:number,
         public allamountInMeal?:number){       
    }
}
