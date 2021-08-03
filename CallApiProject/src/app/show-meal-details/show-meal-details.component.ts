import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-show-meal-details',
  templateUrl: './show-meal-details.component.html',
  styleUrls: ['./show-meal-details.component.css']
})
export class ShowMealDetailsComponent implements OnInit {
  meal: Meal= new Meal(null,null,null,null,null,null,null,null,null,null);
  bgVariable:Boolean=false
  headerVariable:boolean=false
  constructor(private router:ActivatedRoute,private ser:MealService) { }

  ngOnInit(): void {
  //   this.router.params.subscribe(id => {
  //     this.meal.MealCode = parseInt(id);
  //     this.ser.GetMealById(id).subscribe(dataList => this.meal = dataList);
  // });
  window.scrollTo(0,0)
}
 close(){
   document.getElementById("send").style.display="none";
 }
 open(){
  document.getElementById("send").style.display="block";

 }
}
