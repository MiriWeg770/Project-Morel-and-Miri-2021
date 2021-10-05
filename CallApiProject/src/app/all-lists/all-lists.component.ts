import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { Product } from 'src/Models/Product';
import { MealService } from '../meal.service';
import { ShowMealDetailsComponent } from '../show-meal-details/show-meal-details.component';
import { ShowMenuDetailsComponent } from '../show-menu-details/show-menu-details.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent implements OnInit {

  show:string[]=["הכל","לפי מנות","לפי תפריטים"]
  sort:string[]=["הכל","פופולרי","לפי תאריך"]

  listMenus:Menu[]=[
 
    // new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j",null),
    // new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j",null),
  ];
  listMeals:Meal[]=[];
  
  
  
  constructor(public dialog:MatDialog,private ser:MealService,private serU:UserService) {
   
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

  ngOnInit(): void {
    window.addEventListener("scroll",this.scroll)

  }
  
  


  showDetails(x:Meal){
    const dialogRef = this.dialog.open(ShowMealDetailsComponent, {
    autoFocus:false,
    disableClose:false,
    width:"100%",
    height:"100%",
    data:x
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');    
   });  
  }

  scroll(){
    if(window.pageYOffset>200){
      document.getElementById("back-to-top").style.display="block";
    }
    else{
      document.getElementById("back-to-top").style.display="none";
    }

  
  }
  backToTop(){
    window.scroll(0,0);
  }
  

  // getUser(x:number){
  //    this.serU.GetUserById(x).subscribe(succ=>{
  //     return succ
  //   },err=>{
  //     console.log(err)
  //   })
  // }

  

}