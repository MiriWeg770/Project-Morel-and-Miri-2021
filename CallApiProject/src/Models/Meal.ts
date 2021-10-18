import { Time } from "@angular/common";
import { Level } from "./Level";
import { Product } from "./Product";

export class Meal{
    constructor(
        public mealCode:number,
        public mealName:string,
        public instructions:string,
        public numberOfDiners:number,
        public discription:string,
        public mealCategoryCode:number,
        public userCode:number,
        public numberOfViews:number,
        public preparationTime:Time,
        public dateUplaod:Date,
        public dateCreated:Date,
        public PictureCode:number,
        public publish:boolean,
        public dateUpdated:Date,
        public menuCode:number ,
        public userName:string,
        public products:Product[],
        public levelCode:number)
    {

    }
}