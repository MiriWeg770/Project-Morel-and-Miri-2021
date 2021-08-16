import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { runInThisContext } from 'vm';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { DeletMealComponent } from '../delet-meal/delet-meal.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.css']
})
export class MyMealsComponent implements OnInit {
  u: User = new User(0, null, null, null);
  choose = false
  add = false
  newMeal: Meal = new Meal(0, null, null, 0, null, 0, 0, 0, null, null);
  ELEMENT_DATA: Meal[] = [];
  length = 0;
  dataSource;
  click = false
  displayedColumns: string[] = ['y', 'MealName', 'NumberOfDiners', 'countIngredients', 'Date', 'x'];

  constructor(private dialog:MatDialog,private ser:UserService,private serm:MealService) {
         this.u= JSON.parse(localStorage.getItem("user") );
         console.log(this.u)        
         
         
   }

   ngOnInit(): void {
    this.GetAllMeals()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetAllMeals(){
     this.ser.GetUserMeals(this.u.userCode).subscribe(succ => {
      this.ELEMENT_DATA = succ;
      this.length= this.ELEMENT_DATA.length;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      console.log(this.ELEMENT_DATA);
    }, err => {
       console.log(err);
     }) 
  }

   
 
    AddMeal(){
    const dialogRef = this.dialog.open(AddMealComponent, {
    disableClose:true,
    autoFocus:false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');    
        this.GetAllMeals()
   });  
  }
  
  UpdateMeal(x:Meal){
    console.log(x)
    const dialogRef = this.dialog.open(AddMealComponent, {
    disableClose:true,
    autoFocus:false,
    data:x
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetAllMeals()
      console.log(result)
   });
  }

  checked:Meal[]=[]
  check(x:Meal){
    if(!this.checked.includes(x))
      this.checked.push(x) 
     console.log(this.checked)
  }

    delet=false;
    Delet(x:Meal,d=false) {
      console.log(x)
      const dialogRef = this.dialog.open(DeletMealComponent, {
        width: '20%',
        data: d
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
        this.serm.DeleteMeal(x).subscribe(succ=>{
        console.log(succ)  
       this.GetAllMeals();
        },err => {
          console.log(err);
        }) }
      });
  }


  DeletItems(){
    this.checked.forEach(element => {
        this.Delet(element,true)
    });
  }

 
  countIngredients(item:Meal){
    this.serm.GetProductsMeal(item.mealCode).subscribe(succ=>{ 
    if(succ==null)
       return 0;
    else
      return succ.length
   
    },err=>{
      console.log(err)
    })
    
  }



  

  


}

