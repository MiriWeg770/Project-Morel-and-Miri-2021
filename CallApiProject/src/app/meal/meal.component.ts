import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/Models/Meal';
import { User } from 'src/Models/User';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  // meal:Meal=new Meal(1,"סלט", "ddd",12,"dd",1,11,12,null,"morel",new Date("2000-12-12"))
  u:User;
  @Input()
  meal:Meal;
  constructor(private ser:MealService) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    console.log(this.meal)

  }

  ngOnInit(): void {
  }

  add(){
    if(this.u!=null){
    this.ser.AddMeal(this.meal).subscribe(succ=>{
      console.log(succ)
    },err=>{
      console.log(err)
    })
  }
  else{
    console.log("error")
    alert("התחבר/ הירשם")
  }
}
}
