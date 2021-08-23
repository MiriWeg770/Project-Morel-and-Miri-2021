import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { MenuCategories } from 'src/Models/MenuCategories';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  newMenu: Menu = new Menu(1, null, null, 1, new Date(), new Date(), null,1,null)
  selectCa:string
  categories:MenuCategories[];
 data
 listMeals:Meal[]=[]
 MenuList:Meal[]=[]
  constructor(private serm:UserService, private ser:MenuService,private dialogRef: MatDialogRef<AddMealComponent>) {

    this.serm.GetUserMeals((JSON.parse(localStorage.getItem("user")).userCode)).subscribe(succ=>{
      this.listMeals=succ
    },err=>{
      console.log(err)
    })
  }
  
  ngOnInit(): void {
    this.GetCategories();
  }
  GetCategories(){
    this.ser.GetAllCategories().subscribe(succ=>{
      this.categories=succ
      console.log(succ)
    },err=>{
      console.log(err)
    })
  }

  saveMenu() {
    console.log(this.selectCa)
    this.categories.forEach(element => {
      if(element.menuCategoriesName==this.selectCa)
         this.newMenu.menuCode = element.menuCategoriesCode
    });

    this.ser.AddMenu(this.newMenu).subscribe(succ => {
      //לשמור בטבלה של הקטגוריות
      console.log(succ);
    }, err => {
      console.log(err);
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }
}