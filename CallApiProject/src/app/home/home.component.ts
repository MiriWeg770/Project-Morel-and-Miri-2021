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
 urls:string[]=[
   "../../assets/slide1-1-ok.jpg",
   "../../assets/slide1-2-ok.jpg",
   "../../assets/slide1-3-ok.jpg",]
 url=this.urls[0];
  constructor(private router:Router,private serm:MealService,private seru:UserService,private sern:MenuService) {      
    //  localStorage.setItem("user", JSON.stringify(this.myUser));   
    this.GetAllMeals() 
    this.GetAllUsers()
    this.GetAllMenus()
    this.startTimer()
    let x=0
    let interval = setInterval(() => {
    if(this.urls.length>x){
     this.url=this.urls[x]
     x++}
     else
     x=0
    },7300)

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

meals:number=0;
menus:number=0;
users:number=0;
interval;
startTimer() {
    this.interval = setInterval(() => {
      if(this.meals <= this.listMeals.length) {
        this.meals++;  
      }
      if(this.menus <= this.listMenus.length) {
        this.menus++;  
      }
      if(this.users <= this.listUsers.length) {
        this.users++;  
      }
    },50)
  }


  


}
