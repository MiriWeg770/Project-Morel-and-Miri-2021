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
 
  listMeals:Meal[]=[]
  sortBy:string[]=["ללא מיון","פופולרי","לפי תאריך עולה","לפי תאריך יורד"]
  listCategories:MealCategories[]=[]
  notFound=false 
  choose=false
  meals:Meal[]=[]
  checkList:MealCategories[]=[]
  text:string=""
  find:Meal[]=[]
  arr:Meal[]=[]
  s:string=this.sortBy[0]

  constructor(private ser:MealService,private serU:UserService,private serc:MealCategoriesService) {
    this.GetAllMeals()
    this.GetAllCategories()
  
}
  ngOnInit(): void {
 }
 GetAllMeals(){
  this.ser.GetAllMeals().subscribe(succ=> {
    this.listMeals=succ
    this.arr=this.listMeals
    this.ser.MEALS=this.listMeals
    this.listMeals.forEach(element => {
     this.serU.GetUserById(element.userCode).subscribe(succ=>{
       element.userName=succ.userName
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
 sortByCategory(x:number){   
  this.listMeals.forEach(element => {
    if(element.mealCategoryCode==x)
     this.meals.push(element)
  });
  this.choose=true
  this.arr=this.meals 
   console.log(this.arr.length)
 }
 check(x:MealCategories){
   if(!this.checkList.includes(x)){this.checkList.push(x)}
   else{this.checkList.splice(this.checkList.indexOf(x),1)} 
   this.meals=[]
   if(this.checkList.length==0)
       this.arr=this.listMeals
   this.checkList.forEach(element => {
        this.sortByCategory(element.mealCategoriesCode)
   });
   this.choose=this.checkList.length!=0?true:false;
 }
  search(){
  if(this.text==""){
    this.meals=this.arr
    this.notFound=false
  }
  else{
    console.log(this.text)
    this.find=[];
    this.arr.forEach(element => {
    if(element.mealName.includes(this.text)){ 
        this.find.push(element);  
     }
     });
     if(this.find.length==0)
        this.notFound=true
        else{
        this.meals=this.find
        this.choose=true  }
  }
}
 sort(){
   console.log(this.s)
  if(this.s==this.sortBy[0]){
    this.GetAllMeals()
  } 
  if(this.s==this.sortBy[1]){
    console.log(this.sortBy[1])
    let swapped = true;
    while(swapped)
    {
    swapped = false;
    for (let index = 0; index < this.listMeals.length-1; index++) {
      if (this.listMeals[index].numberOfViews < this.listMeals[index+ 1].numberOfViews)
       {
            let t = this.listMeals[index];
            this.listMeals[index] = this.listMeals[index + 1];
            this.listMeals[index + 1] = t;
            swapped = true;
       }
      }
    }
  }
  if(this.s==this.sortBy[2]){
    console.log(this.sortBy[1])
    let swapped = true;
    while(swapped)
    {
    swapped = false;
    for (let index = 0; index < this.listMeals.length-1; index++) {
      if (this.listMeals[index].dateUplaod < this.listMeals[index+ 1].dateUplaod)
       {
            let t = this.listMeals[index];
            this.listMeals[index] = this.listMeals[index + 1];
            this.listMeals[index + 1] = t;
            swapped = true;
       }
      }
    }
  }
  if(this.s==this.sortBy[3]){
    console.log(this.sortBy[1])
    let swapped = true;
    while(swapped)
    {
    swapped = false;
    for (let index = 0; index < this.listMeals.length-1; index++) {
      if (this.listMeals[index].dateUplaod > this.listMeals[index+ 1].dateUplaod)
       {
            let t = this.listMeals[index];
            this.listMeals[index] = this.listMeals[index + 1];
            this.listMeals[index + 1] = t;
            swapped = true;
       }
      }
    }
  }
}

}

