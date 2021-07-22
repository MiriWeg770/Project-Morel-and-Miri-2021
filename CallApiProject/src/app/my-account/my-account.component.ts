import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
name:string;
mail:string;
letter:string
menus:Menu[]=[
  new Menu(null,null,null,null,null,null,null,null),
  new Menu(null,null,null,null,null,null,null,null),
  new Menu(null,null,null,null,null,null,null,null),
  new Menu(null,null,null,null,null,null,null,null),
  new Menu(null,null,null,null,null,null,null,null),
]
  constructor(private router:Router) { 
    // this.router.navigate(["/MyAccount"])
    let u:User= JSON.parse(localStorage.getItem("user"));
    this.name= u.UserName;
    this.mail=u.Mail;
    this.letter=this.name[0]
  }
  meal;menu=true;setting;
  
  fmeal(){
  this.meal=true;
  this.menu=false;
  this.setting=false

  }
  fmenu(){
    this.meal=false;
    this.menu=true;
    this.setting=false

  }
  fsetting(){
    this.meal=false;
    this.menu=false;
    this.setting=true
  }
  ngOnInit(): void {
  }

}
