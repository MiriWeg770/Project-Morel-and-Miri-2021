import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { AddMealComponent } from '../add-meal/add-meal.component';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.css']
})
export class MyMealsComponent implements OnInit {
 u:User;
 listMeals:Meal[];
newMeal:Meal;
  constructor(private dialog:MatDialog) {
        this.u= JSON.parse(localStorage.getItem("user"));

   }
  //  openDialog(){
  //   const dialogConfig=new MatDialogConfig();
  //   dialogConfig.disableClose=true;
  //   dialogConfig.autoFocus=false;
  //   // dialogConfig.width="100%";
  //   dialogConfig.panelClass="mat-dialog-container"
  //   this.dialog.open(AddMealComponent,dialogConfig);
  //  }


   openDialog(): void {
    const dialogRef = this.dialog.open(AddMealComponent, {
      width: '100%',
      data: {meal:this.newMeal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newMeal = result;
    });
  }
  ngOnInit(): void {

  }

}
