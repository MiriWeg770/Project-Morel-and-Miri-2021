import { Product } from "./Product";

export class Meal{
    constructor(public mealCode:number,public mealName:string,public instructions:string, public numberOfDiners:number,public discription:string, public mealCategoryCode:number,public userCode:number, public numberOfViews:number,public useName:string,public products:Product[])
    {

    }
}