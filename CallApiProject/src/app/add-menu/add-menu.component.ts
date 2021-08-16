import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/Models/Menu';
import { MenuCategories } from 'src/Models/MenuCategories';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  newMenu: Menu = new Menu(1, null, null, 1, null, null, null,1,null,)
  selectCa:string
  categories:MenuCategories[];

  constructor(private ser:MenuService,private dialogRef: MatDialogRef<AddMealComponent>) { }

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
      console.log(succ);
    }, err => {
      console.log(err);
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
