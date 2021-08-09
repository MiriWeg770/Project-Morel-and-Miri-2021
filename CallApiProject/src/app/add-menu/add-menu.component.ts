import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/Models/Menu';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  newMenu: Menu = new Menu(1, null, null, 1, null, null, 1, null)

  constructor(private ser:MenuService,private dialogRef: MatDialogRef<AddMealComponent>) { }

  ngOnInit(): void {
  }
  saveMenu() {
    console.log(this.newMenu)
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
