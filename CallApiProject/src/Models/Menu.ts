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
        public publish:boolean,
        public pictureCode:number,
        public dateUpload:Date,
        public meals:Meal[],
        public levelCode:number)
                 { }
}