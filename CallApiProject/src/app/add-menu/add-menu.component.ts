import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Menu } from 'src/Models/Menu';
import { AddMealComponent } from '../add-meal/add-meal.component';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {

  newMenu:Menu = new Menu(null,null,null,null,null,null,null,null)

  constructor(private dialogRef:MatDialogRef<AddMealComponent>) { }

  ngOnInit(): void {
  }
  closeDialog(){
    this.dialogRef.close();
   }

}
