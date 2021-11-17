import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 myUser:User=null;
 listMeals:Meal[]=[]
 listUsers:User[]=[]
 listMenus:Menu[]=[]
 Meals:Meal[]=[]
 Menus:Menu[]=[]
  constructor(private router:Router,private serm:MealService,private seru:UserService,private sern:MenuService) {      
    //  localStorage.setItem("user", JSON.stringify(this.myUser));   
    this.GetAllMeals() 
    this.GetAllUsers()
    this.GetAllMenus()
    
 }

  ngOnInit(): void {

  }
  continue(){   
       this.router.navigate(["/MyHome/AllLists"])
}

GetAllMeals(){
  this.serm.GetAllMeals().subscribe(succ=>{
    this.listMeals=succ
   for (let index = 0; index < 5; index++) {
    this.Meals.push(this.listMeals[index])
   }
  },err=>{console.log(err)})
}
GetAllUsers(){
  this.seru.GetAllUsers().subscribe(succ=>{this.listUsers=succ},err=>{console.log(err)})
}
GetAllMenus(){
  this.sern.GetAllMenus().subscribe(succ=>{
    this.listMenus=succ
    for (let index = 0; index < 5; index++) {
     this.Menus.push(this.listMenus[index])
    }
  },err=>{console.log(err)})
}



}
