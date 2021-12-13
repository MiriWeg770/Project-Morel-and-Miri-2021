import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/Models/Meal';
import { LevelService } from '../level.service';
import { MealCategoriesService } from '../meal-categories.service';
import { MealService } from '../meal.service';
import { PictureService } from '../picture.service';
import { UnitMeasureService } from '../unit-measure.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  @Input() meal:Meal;
  Instructions:string[]
  UnitMeasures:string[]=[]
  url;
  constructor(private ser:MealService,private seru:UnitMeasureService,private serp:PictureService,private serl:LevelService
    ,private serc:MealCategoriesService) { 
      this.GetCategory(this.meal.mealCategoryCode)
    
  }

  ngOnInit(): void {
    // this.GetInstructions(this.meal.instructions)
    // this.GetAllUnitMeasures()
  }

  GetInstructions(i:string){
    console.log(i)
    this.Instructions=["fefef"]
    let x:string=""
    for (let index = 0; index < i.length; index++) {
      if(i[index]=='#'){
         this.Instructions.push(x)
         x=""
      }
     else
        x+=i[index]  
    }    
    console.log(this.Instructions)
  }
 
  // GetUnit(u:string){
  //   let x=""
  //   for (let index = 0; index < succ.length; index++) {
  //     if(element.unitMeasureCode==succ[index].unitCode){
  //        let x=""
  //         if(element.amountInMeal>1){
  //          switch (succ[index].unitName) {        
  //           case "יחידה":x="יחידות";break;
  //           case "כף":x="כפות";break;                                 
  //           case "כפית":x="כפיות";break;
  //           case "ליטר":x="ליטרים";break;
  //           case "כוס":x="כוסות";break;
  //           default:x=succ[index].unitName;break;
  //         }
  //          this.UnitMeasures.push(x)       
  //         }      
  //         else{this.UnitMeasures.push(succ[index].unitName)}                                  
  //     }         
  //   }
  // }
  GetAllUnitMeasures(){
    this.seru.GetAllUnitMeasures().subscribe(succ=>{
      console.log(succ)
      console.log(this.meal.products)
      // this.unit=succ
      this.meal.products.forEach(element => {
        for (let index = 0; index < succ.length; index++) {
          if(element.unitMeasureCode==succ[index].unitCode){
             let x=""
              if(element.amountInMeal>1){
               switch (succ[index].unitName) {        
                case "יחידה":x="יחידות";break;
                case "כף":x="כפות";break;                                 
                case "כפית":x="כפיות";break;
                case "ליטר":x="ליטרים";break;
                case "כוס":x="כוסות";break;
                default:x=succ[index].unitName;break;
              }
               this.UnitMeasures.push(x)       
              }      
              else{this.UnitMeasures.push(succ[index].unitName)}                                  
          }         
        }
      }); 
      console.log(this.UnitMeasures)
    }),err=>{console.log(err)}       
  
  }



  GetPicture(x:number){
    this.serp.GetPictureById(x).subscribe(succ=>{
      this.url=succ.pictureName
   },err=>{
     console.log(err)
   })
    }
    GetLevel(x:number){
      let l=""
      this.serl.GetAllLevels().subscribe(succ => { 
        succ.forEach(element => {
          if(element.levelCode==this.meal.levelCode)
            l= element.levelName;
        });
       }, err => {
         console.log(err)
       })
       return l;
    }
    GetCategory(x:number){
      let c=""
      this.serc.GetAllCategories().subscribe(succ => { 
        succ.forEach(element => {
          if(element.mealCategoriesCode==this.meal.mealCategoryCode)
            c= element.mealCategoriesName;
        });
       }, err => {
         console.log(err)
       })
       return c;
    }
    Time(){
      console.log("dd")
    }
    
}
