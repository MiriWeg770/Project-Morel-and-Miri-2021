import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { Product } from 'src/Models/Product';
import { MealService } from '../meal.service';
import { ShowMenuDetailsComponent } from '../show-menu-details/show-menu-details.component';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent implements OnInit {

  show:string[]=["הכל","לפי מנות","לפי תפריטים"]
  sort:string[]=["הכל","פופולרי","לפי תאריך"]

  listMenus:Menu[]=[
    new Menu(1,"menu","discription",1,new Date(1,1,1),new Date(),null,1,null),
    new Menu(1,"menu","discription",1,new Date(1,1,1),new Date(),null,1,null),
    new Menu(1,"menu","discription",1,new Date(1,1,1),new Date(),null,1,null),
    new Menu(1,"menu","discription",1,new Date(1,1,1),new Date(),null,1,null),
    new Menu(1,"menu","discription",1,new Date(1,1,1),new Date(),null,1,null),
  ];
  listMeals:Meal[]=[];
  
  
  
  constructor(public dialog:MatDialog,private ser:MealService) {
   
  }

  ngOnInit(): void {
    window.addEventListener("scroll",this.scroll)
    this.ser.GetAllMeals().subscribe(succ=> {
       this.listMeals=succ
       console.log(this.listMeals[0])

    },err=>{
      console.log(err)
    })
 
  }
  
  
  scroll(){
    if(window.pageYOffset>400){
      document.getElementById("back-to-top").style.display="block";
    }
    else{
      document.getElementById("back-to-top").style.display="none";
    }
    // if(window.pageYOffset> document.getElementById("nav").offsetTop ){
    //   document.getElementById("nav").classList.add("sticky")
    //  } else {
    //   document.getElementById("nav").classList.remove("sticky");
    // }
  
  }
  backToTop(){
    window.scrollTo(0,0);
  }
  

  
}