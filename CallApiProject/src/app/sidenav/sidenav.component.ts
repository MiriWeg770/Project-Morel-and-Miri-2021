import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/Models/User';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { AddMenuComponent } from '../add-menu/add-menu.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
u:User
  constructor(public dialog:MatDialog) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    
  }

  ngOnInit(): void {
  }


   
   

}
