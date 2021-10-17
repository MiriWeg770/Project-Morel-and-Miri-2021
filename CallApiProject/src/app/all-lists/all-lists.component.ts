import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { type } from 'os';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { Product } from 'src/Models/Product';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';
import { ShowMealDetailsComponent } from '../show-meal-details/show-meal-details.component';
import { ShowMenuDetailsComponent } from '../show-menu-details/show-menu-details.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent implements OnInit {

  show:string[]=["הכל","לפי מתכונים","לפי תפריטים"]
  sort:string[]=["הכל","פופולרי","לפי תאריך"]

  listMenus:Menu[]=[
 
    // new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j",null),
    // new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j",null),
];
  listMeals:Meal[]=[];
  select1:string=this.show[0];
  select2:string=this.sort[0];
  AllLists:any[]=[]
  
  constructor(public dialog:MatDialog,private ser:MealService,private serU:UserService,private serm:MenuService) {
   
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
        this.AllLists.push(element)
      });
    },err=>{
      console.log(err)
    })


    this.serm.GetAllMenus().subscribe(succ=>{
    this.listMenus=succ
    this.listMenus.forEach(element => {
      this.serU.GetUserById(element.userCode).subscribe(succ=>{
        element.userName=succ.userName
        // console.log(this.listMeals)
      },err=>{
        console.log(err)
      })
      this.AllLists.push(element)

    })
    console.log(succ)
    console.log(this.AllLists)

    },err=>{console.log(err)})

  }

  ngOnInit(): void { 
    this.showBy()   
    // window.addEventListener("scroll",this.scroll)
  }
  
  


  // showDetails(x:Meal){
  //   const dialogRef = this.dialog.open(ShowMealDetailsComponent, {
  //   autoFocus:false,
  //   disableClose:false,
  //   width:"100%",
  //   height:"100%",
  //   data:x
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');    
  //  });  
  // }

  // scroll(){
  //   if(window.pageYOffset>200){
  //     document.getElementById("back-to-top").style.display="block";
  //   }
  //   else{
  //     document.getElementById("back-to-top").style.display="none";
  //   }

  
  // }
  // backToTop(){
  //   window.scroll(0,0);
  // }
  

  // getUser(x:number){
  //    this.serU.GetUserById(x).subscribe(succ=>{
  //     return succ
  //   },err=>{
  //     console.log(err)
  //   })
  // }

isMeal;
isMenu;
showBy(){
  console.log(this.select1)
  if(this.show[2]==this.select1){
     this.AllLists=this.listMenus
     this.isMenu=true
     this.isMeal=false
     console.log(this.AllLists)
    }
  if(this.show[1]==this.select1){
      this.AllLists=this.listMeals
      this.isMenu=false
      this.isMeal=true
      console.log(this.AllLists)
    }
  if(this.show[0]==this.select1){
    this.isMenu=true
    this.isMeal=true
    this.AllLists=[]
      for (let index1 = 0; index1 < this.listMeals.length; index1++) {
         this.AllLists.push(this.listMeals[index1])
      }
      for (let index2 = 0; index2 < this.listMenus.length; index2++) {
         this.AllLists.push(this.listMenus[index2])  
      }        
      console.log(this.AllLists)
    }
  // this.sortBy()
}

// sortBy(){
//   for (let index1 = 0; index1 < this.AllLists.length; index1++) {
//     for (let index = 0; index < this.AllLists.length; index++) {
//       if(this.AllLists[index1] instanceof Meal)
//         if((this.AllLists[index1] as Meal).numberOfViews>(this.AllLists[index1] as Meal).numberOfViews)
//     }
//   }
// }
MealShowDeails=false
theMeal:Meal
showMealDetails(x:Meal){
  this.MealShowDeails=true;
  this.theMeal=x
  console.log(this.theMeal)
}

gotoTop(){}




  

}