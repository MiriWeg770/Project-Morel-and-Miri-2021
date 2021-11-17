import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/Models/Meal';
import { MealCategories } from 'src/Models/MealCategories';
import { MealCategoriesService } from '../meal-categories.service';
import { MealService } from '../meal.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-meals',
  templateUrl: './all-meals.component.html',
  styleUrls: ['./all-meals.component.css']
})
export class AllMealsComponent implements OnInit {
  choose=false
  sortBy:string[]=["הכל","פופולרי","לפי תאריך עולה","לפי תאריך יורד"]
  listMeals:Meal[]=[]
  listCategories:MealCategories[]=[]
  constructor(private ser:MealService,private serU:UserService,private serc:MealCategoriesService) {
    this.GetAllMeals()
    this.GetAllCategories()
  }
  ngOnInit(): void {
  }

 GetAllMeals(){
  this.ser.GetAllMeals().subscribe(succ=> {
    this.listMeals=succ
    this.listMeals.forEach(element => {
     this.serU.GetUserById(element.userCode).subscribe(succ=>{
       element.userName=succ.userName
       // console.log(this.listMeals)
     },err=>{
       console.log(err)
     })
     this.ser.GetProductsMeal(element.mealCode).subscribe(succ=>{
       element.products=succ
     },err=>{console.log(err)
     })    
   });
 },err=>{
   console.log(err)
 })
 }
 
 GetAllCategories(){
   this.serc.GetAllCategories().subscribe(succ=>{
   this.listCategories=succ
   },err=>{console.log(err)})
 }

 GetMealsByCategory(x:MealCategories){
   let count=0
  this.listMeals.forEach(element => {
    if(element.mealCategoryCode==x.mealCategoriesCode)
     count++;
  });
  return count;
 }
s:string=this.sortBy[0]
 sort(){
   console.log(this.s)
//  console.log(this.sortBy[x])
 } 
  meal:Meal[]=[]
 sortByCategory(x:number){
   let m:Meal[]=[]
   
  this.listMeals.forEach(element => {
    if(element.mealCategoryCode==x)
     this.meal.push(element)
  });
  console.log(this.meal)
  this.choose=true
 }
 checkList:MealCategories[]=[]
 check(x:MealCategories){
   if(!this.checkList.includes(x)){this.checkList.push(x)}
   else{this.checkList.splice(this.checkList.indexOf(x),1)} 
   this.meal=[]
   this.checkList.forEach(element => {
        this.sortByCategory(element.mealCategoriesCode)
   });
   this.choose=this.checkList.length!=0?true:false;
 }
 
}
