import { Level } from "./Level";
import { Meal } from "./Meal";

export class Menu {
    constructor(
        public menuCode: number,
        public menuName: string,
        public discription: string,
        public userCode: number,
        public dateCreated: Date,
        public dateUpdated: Date,
        public links: string,
        public viewsNumber: number,
        public userName: string, 
        public dateUpload:Date,
        public pictureCode:number,        
        public publish:boolean,
        public levelCode:number,
        public meals:Meal[],
        )
                 { }
}