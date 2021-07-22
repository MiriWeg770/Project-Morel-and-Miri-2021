import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
    new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
   
  
 
  ];
  
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  // showDetails(){
  //   const dialogRef=this.dialog.open(ShowMenuDetailsComponent,{
  //     width:'1000px',
  //     panelClass: '.dialog-container',
  //     data:{
  //       data:{
      
  //    }
  
  //   }}); 
  // }
  

  
}