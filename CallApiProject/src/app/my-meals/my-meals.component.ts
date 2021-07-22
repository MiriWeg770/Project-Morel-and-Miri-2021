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

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.css']
})
export class MyMealsComponent implements OnInit {
 u:User=new User(1,null,null,null);
 changeViewOfList=true
 choose=false
 showDetails=false
add=false
newMeal:Meal;
name=""
 ELEMENT_DATA:Meal[]=[];
length;
dataSource;

click=false
displayedColumns: string[] = ['MealName', 'NumberOfDiners', 'countIngredients', 'x'];

  constructor(private dialog:MatDialog,private router:Router,private ser:UserService) {
        //  this.u= JSON.parse(localStorage.getItem("user") );
         console.log(this.u.UserCode)        
         
   }

   ngOnInit(): void {
    this.ser.GetUserMeals(this.u.UserCode).subscribe(succ => {
      this.ELEMENT_DATA = succ;
      this.length= this.ELEMENT_DATA.length;
      this.dataSource = new MatTableDataSource(succ);
       console.log(this.dataSource);
     }, err => {
       console.log(err);
     })  
  }

   
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }






   close(){
    document.getElementById("new").style.display="none";
  }
  open(){
   document.getElementById("new").style.display="block";
  }
  new(){  console.log(this.name)

  this.router.navigate(["/User/AddMeal/{{name}}"])
  }
   openDialog(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=false;
    // dialogConfig.width="100%";
    dialogConfig.panelClass="mat-dialog-container"
    this.dialog.open(AddMealComponent,dialogConfig);
   }


  //  add()  {
  //   const dialogRef = this.dialog.open(AddMealComponent, {
  //     width: '100%',
  //     data: {meal:this.newMeal}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.newMeal = result;
  //   });}

    delet()  {
      const dialogRef = this.dialog.open(DeletMealComponent, {
        width: '20%',
      });
    
  }

  save(){
    this.showDetails=!this.showDetails
  }
 
  // close(){
  //   document.getElementById("send").style.display="none";
  // }
  // open(){
  //  document.getElementById("send").style.display="block";
 
  // }

  countIngredients(item:Meal){
    let count=0
    // let array=item.Ingredients
    // array.forEach(element => {
    //   count++;
    // });

    return count;
 
  }

  deletItems(){
    
  }


  


}

