import { Product } from "./Product";

export class Meal{
    constructor(public MealCode:number,public MealName:string,public Instructions:string, public NumberOfDiners:number,public Discription:string, public MealCategoryCode:number,public UserCode:number, public NumberOfViews:number,public Products:Product[], public UseName:string){

    }
}