import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  text;
  listMeals:Meal[]=[];
  listMenus:Menu[]=[];
  meals:Meal[]=[]
  menus:Menu[]=[]
  constructor(private router:ActivatedRoute,private ser:MealService,private serme:MenuService) { 
   this.text= this.router.snapshot.paramMap.get('text').toString()
    this.GetAllMeals()
    this.GetAllMenus()
  }

  ngOnInit(): void {
  }
  GetAllMeals(){
    this.ser.GetAllMeals().subscribe(succ=>{
      this.listMeals=succ   
      this.listMeals.forEach(element => {
        this.ser.GetProductsMeal(element.mealCode).subscribe(succ=>{
          element.products=succ
        },err=>{console.log(err)})
      });
       console.log(this.listMeals)
    },err=>console.log(err))
  }
  GetAllMenus(){
    this.serme.GetAllMenus().subscribe(succ=>{
      this.listMenus=succ 
      this.listMenus.forEach(element => {
         this.serme.GetMenuMeals(element.menuCode).subscribe(succ=>{
           element.meals=succ
         },err=>{console.log(err)})
      });
     console.log(this.listMenus)
     if(this.listMenus.length>0 && this.listMeals.length>0)
      this.search()
    },err=>console.log(err))
  }
  search(){
    this.meals=[]
    this.menus=[]
    let arr:string[]=[]
    let s=""
    for (let index = 0; index < this.text.length; index++){
       if(this.text[index]!=" "){
       s+=this.text[index]
       }
       else{
         arr.push(s)
         s=""
       }     
      }  
      arr.push(s)
      console.log(arr)
    
  this.listMenus.forEach(element => {
    arr.forEach(word => {
      if(element.menuName.includes(word) && !this.menus.includes(element))
     this.menus.push(element)
    }); 
  });
  console.log(this.menus.length)

  this.listMeals.forEach(element1 => {
    arr.forEach(word => {
      if(element1.mealName.includes(word) && !this.meals.includes(element1))
     this.meals.push(element1)
    }); 
   });
   console.log(this.meals.length)
  }

}
