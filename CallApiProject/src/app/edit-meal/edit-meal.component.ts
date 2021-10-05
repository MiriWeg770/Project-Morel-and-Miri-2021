import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { MealCategories } from 'src/Models/MealCategories';
import { Product } from 'src/Models/Product';
import { MealCategoriesService } from '../meal-categories.service';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css']
})
export class EditMealComponent implements OnInit {

  ELEMENT_DATA: Product[]=[];
  meal:Meal=new Meal(0,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  newProduct:Product=new Product(0,null,null,null,"null");
  categories:MealCategories[];
  selectCa:string
  @Input() data:Meal;

  constructor(private ser:MealService,private serc:MealCategoriesService) { 
   console.log(this.data)
   
    // this.router.params.subscribe(parameters => {
    //   let code = +parameters["id"];
    //    ser.GetAllMeals().subscribe(succ=>{
    //     this.meal =succ.find(p=>p.mealCode==code)
    //     console.log(this.meal)
    //    });
    //   })

      // this.serc.GetAllCategories().subscribe(succ=>{
      //   this.categories=succ
      //   console.log(succ)
      // },err=>{
      //   console.log(err)
      // })
          // serc.GetCategoryById(this.data.mealCategoryCode).subscribe(succ=>{
          //   this.selectCa=succ.mealCategoriesName
          //   console.log(this.selectCa)
          // },err=>{
          //   console.log(err)
          // }) 
      }
    
  
  

  ngOnInit(): void {
    console.log(this.data)
  }

  updateMeal(){
    this.meal.products=this.ELEMENT_DATA
    console.log(this.data.products)

    this.categories.forEach(element => {
      if(element.mealCategoriesName==this.selectCa)
         this.data.mealCategoryCode=element.mealCategoriesCode
    });
    this.ser.UpdateMeal(this.data).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
    })  
  }
}
  
