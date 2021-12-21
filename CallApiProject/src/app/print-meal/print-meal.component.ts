import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/Models/Meal';
import { LevelService } from '../level.service';
import { MealCategoriesService } from '../meal-categories.service';
import { PictureService } from '../picture.service';
import { UnitMeasureService } from '../unit-measure.service';

@Component({
  selector: 'app-print-meal',
  templateUrl: './print-meal.component.html',
  styleUrls: ['./print-meal.component.css']
})
export class PrintMealComponent implements OnInit {

  @Input() m:Meal;
  @Input() u:string[]
  // m1:Meal=new Meal(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  url="../../assets/help.png";
  level;
  category;
  Instructions:string[]=[]
  // UnitMeasures:string[]=[]
  constructor(private serl:LevelService,private serc:MealCategoriesService,private seru:UnitMeasureService
    ,private serp:PictureService) {   
      this.GetLevel()
      this.GetCategory()   
      this.Instructions=[]
    // this.GetInstructions()
    // this.GetAllUnitMeasures()
   }

  ngOnInit(): void {
    // this.GetInstructions()
  }

  GetLevel(){
    this.serl.GetAllLevels().subscribe(succ => { 
      succ.forEach(element => {
        if(element.levelCode==this.m.levelCode)
          this.level= element.levelName;
      });
     }, err => {
       console.log(err)
     })
  }
  GetCategory(){
    this.serc.GetAllCategories().subscribe(succ => { 
      succ.forEach(element => {
        if(element.mealCategoriesCode==this.m.mealCategoryCode)
          this.category= element.mealCategoriesName;
      });
     }, err => {
       console.log(err)
     })
  }
  Time(){
    let t:Date=new Date(this.m.preparationTime)
    if(t.getHours()>0 && t.getMinutes()>0)
       return t.getHours()+" שעות ו "+t.getMinutes()+" דקות "
    else  if(t.getHours()<=0 && t.getMinutes()>0)
       return t.getMinutes()+" דקות "
    else  if(t.getHours()>0 && t.getMinutes()<=0)
         return t.getHours()+" שעות "
   }
   GetInstructions(i){
     if(i){
    let x:string=""
    for (let index = 0; index < i.length; index++) {
      if(i[index]=='#'){
         this.Instructions.push(x)
         x=""
      }
     else
        x+=i[index]  
    }    
  }
    console.log(this.Instructions)
  }
  // GetAllUnitMeasures(){
  //   this.seru.GetAllUnitMeasures().subscribe(succ=>{
  //     console.log(succ)
  //     console.log(this.m.products)
  //     // this.unit=succ
  //     this.m.products.forEach(element => {
  //       for (let index = 0; index < succ.length; index++) {
  //         if(element.unitMeasureCode==succ[index].unitCode){
  //            let x=""
  //             if(element.amountInMeal>1){
  //              switch (succ[index].unitName) {        
  //               case "יחידה":x="יחידות";break;
  //               case "כף":x="כפות";break;                                 
  //               case "כפית":x="כפיות";break;
  //               case "ליטר":x="ליטרים";break;
  //               case "כוס":x="כוסות";break;
  //               default:x=succ[index].unitName;break;
  //             }
  //              this.UnitMeasures.push(x)       
  //             }      
  //             else{this.UnitMeasures.push(succ[index].unitName)}                                  
  //         }         
  //       }
  //     }); 
  //     console.log(this.UnitMeasures)
  //   }),err=>{console.log(err)}       
  
  // }
  GetPicture(x:number){
    this.serp.GetPictureById(x).subscribe(succ=>{
      this.url=succ.pictureName
   },err=>{
     console.log(err)
   })
    }
}
