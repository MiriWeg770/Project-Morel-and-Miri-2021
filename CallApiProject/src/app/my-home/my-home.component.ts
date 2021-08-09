import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { LogOutComponent } from '../log-out/log-out.component';


@Component({
  selector: 'app-my-home',
  templateUrl: './my-home.component.html',
  styleUrls: ['./my-home.component.css']
})
export class MyHomeComponent implements OnInit {
  // listMenus:Menu[]=[
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j"),
  //   new Menu(1,"menu","discription",1,new Date(1,1,1),"1",1,"j")
  // ];
 
// name:string;
u:User;
 constructor(public dialog:MatDialog){
  this.u= JSON.parse(localStorage.getItem("user"));

}
 sideBarToggler(){
  this.sideBarOpen=!this.sideBarOpen;
} 
 sideBarOpen=false;

  ngOnInit(): void {   
  //   let u:User= JSON.parse(localStorage.getItem("user"));
  //   this.name= u.UserName;
  }
}
