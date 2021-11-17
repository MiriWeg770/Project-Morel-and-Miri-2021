import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { MealCategories } from 'src/Models/MealCategories';
import { MealCategoriesService } from '../meal-categories.service';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal-category',
  templateUrl: './meal-category.component.html',
  styleUrls: ['./meal-category.component.css']
})
export class MealCategoryComponent implements OnInit {

  code;
  name;
  list:Meal[]=[]
  listCategories:MealCategories[]=[]
  constructor(private router:ActivatedRoute,private ser:MealCategoriesService,private serm:MealService) { 
    this.router.params.subscribe(parameters => {
      let c = +parameters["id"];
       this.code=c
    });
    this.GetCategories()
    this.GetMeals()
  }

  ngOnInit(): void {
  }

  GetCategories(){
    this.ser.GetAllCategories().subscribe(succ=>{
      this.listCategories=succ
      this.listCategories.forEach(element => {
        if(element.mealCategoriesCode==this.code)
         this.name=element.mealCategoriesName
      });
    },err=>{console.log(err)})
  }

  GetMeals(){
 this.serm.GetAllMeals().subscribe(succ=>{
   succ.forEach(element => {
     if(element.mealCategoryCode==this.code)
     this.list.push(element)
   });
 }
   ,err=>{console.log(err)})
   }
   GetMealsByCategory(x:MealCategories){
    let count=0
   this.list.forEach(element => {
     if(element.mealCategoryCode==x.mealCategoriesCode)
      count++;
   });
   return count;
  }
 

}
