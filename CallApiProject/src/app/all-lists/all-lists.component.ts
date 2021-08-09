import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { Product } from 'src/Models/Product';
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
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  ];
  listMeals:Meal[]=[
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
  ]
  
  
  constructor(public dialog:MatDialog) {
   }

  ngOnInit(): void {
    window.addEventListener("scroll",this.scroll)
  }
  
  
  scroll(){
    if(window.pageYOffset>300){
      document.getElementById("back-to-top").style.display="block";
    }
    else{
      document.getElementById("back-to-top").style.display="none";

    }
  }
  backToTop(){
    window.scrollTo(0,0);
  }
  

  
}