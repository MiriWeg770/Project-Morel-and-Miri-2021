import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meal } from 'src/Models/Meal';
import { User } from 'src/Models/User';
import { MealService } from '../meal.service';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { PictureService } from '../picture.service';
import { LevelService } from '../level.service';
import { Product } from 'src/Models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

@Input() meal:Meal;
 u:User; 
 level:string="";
 name:string
 add;
 url="../../assets/help.png";
 code;
 
  constructor(private ser:MealService,private dialog:MatDialog,private serp:PictureService,private serl:LevelService,private router:Router) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    this.GetLevel()
  }

  ngOnInit(): void {
    this.MealIsExists() 
    this.code=this.meal.userCode
    // console.log(this.code) 
  }
  Account(){
    this.dialog.open(MakeAccountComponent);
  }
  count(){
    this.ser.ChangeViewsNumber(this.meal).subscribe(succ=>{
    this.router.navigate(['/Home/ShowMealDetails/'+this.meal.mealCode])
    },err=>{console.log(err)})
  }
  MealIsExists(){
    if(this.u!=null){
    let m:Meal=new Meal(0,this.meal.mealName,this.meal.instructions,this.meal.numberOfDiners,this.meal.discription,this.meal.mealCategoryCode,this.u.userCode,null,this.meal.preparationTime,null,new Date(),this.meal.pictureCode, false,null,null,this.u.userName,null,this.meal.levelCode)
    this.ser.MealIsExists(m).subscribe(succ=>{
     this.add=succ
     this.meal.userCode=this.meal.userCode
    //  console.log(this.meal)
    },err=>{console.log(err)})
    console.log(this.add)
  }
}
  GetPicture(x:number){
  this.serp.GetPictureById(x).subscribe(succ=>{
    this.url=succ.pictureName
 },err=>{
   console.log(err)
 })
  }
  GetLevel(){
    this.serl.GetAllLevels().subscribe(succ => { 
      succ.forEach(element => {
        if(element.levelCode==this.meal.levelCode)
          this.level= element.levelName;
      });
     }, err => {
       console.log(err)
     })
  }
  interval
  openMessage(){
    console.log(this.add)
    if(this.add)
    document.getElementById("dialog2").style.display="block"
    else
    document.getElementById("dialog").style.display="block"
    let x=0
     this.interval = setInterval(() => {
    x++
    if(x==5){
    this.closeMessage()
    }
    console.log(x)
    },1000)
  }
  closeMessage(){
    clearInterval(this.interval)
    document.getElementById("dialog").style.display="none"
    document.getElementById("dialog2").style.display="none"
  }
  AddMeal(){
      let pro:Product[]=this.meal.products;
      pro.forEach(element => {
        element.productCode=0
      });
     let m:Meal=new Meal(0,this.meal.mealName,this.meal.instructions,this.meal.numberOfDiners,this.meal.discription,this.meal.mealCategoryCode,this.u.userCode,null,this.meal.preparationTime,null,new Date(),this.meal.pictureCode, false,null,null,this.u.userName,pro,this.meal.levelCode)
     console.log(m)
      
     this.ser.AddMealToUser(m).subscribe(succ=>{
      this.add=true
      this.meal.userCode=this.code
      console.log(this.meal)
      this.closeMessage()
      this.openMessage()
    },err=>{
      console.log(err)
    })
  }
  DeletMeal(){
    this.meal.userCode=this.u.userCode
      this.ser.DeleteMeal(this.meal).subscribe(succ=>{
        this.add=!this.add
        this.meal.userCode=this.code
        this.closeMessage()
        this.openMessage()
      },err=>{console.log(err)})
   }
  }
 