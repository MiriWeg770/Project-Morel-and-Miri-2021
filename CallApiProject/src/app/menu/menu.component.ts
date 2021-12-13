import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { LevelService } from '../level.service';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { MenuService } from '../menu.service';
import { PictureService } from '../picture.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

@Input() menu:Menu;
 u:User; 
 level:string="";
 name:string
 add=false
 url="../../assets/help.png";
 code;

 constructor(private serp:PictureService, private ser:MenuService,private router:Router,private serl:LevelService,private dialog:MatDialog) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    this.GetLevel()
  }
  
  ngOnInit(): void {
    this.MenuIsExists() 
    this.code=this.menu.userCode
    // console.log(this.code) 
  } 
   count(){
    this.ser.ChangeViewsNumber(this.menu).subscribe(succ=>{
      this.router.navigate(['/Home/ShowMenuDetails/'+this.menu.menuCode])
    },err=>{console.log(err)})
  }
  Account(){
    this.dialog.open(MakeAccountComponent);
  }
  MenuIsExists(){
    if(this.u!=null){
    let m:Menu=new Menu(0,this.menu.menuName,this.menu.discription,this.u.userCode,new Date(),null,0,this.u.userName,null,this.menu.pictureCode,false,this.menu.levelCode,this.menu.meals,this.menu.menuCategoryCode)
    this.ser.MenuIsExists(m).subscribe(succ=>{
     this.add=succ
     this.menu.userCode=this.menu.userCode
    //  console.log(this.menu)
    },err=>{console.log(err)})
    // console.log(this.add)
  }
}
  GetPicture(x:number){
  this.serp.GetPictureById(x).subscribe(succ=>{
    this.url=succ.pictureName
 },err=>{
   console.log(err)
 })
  } 
  GetLevel(){
    this.serl.GetAllLevels().subscribe(succ => { 
      succ.forEach(element => {
        if(element.levelCode==this.menu.levelCode)
          this.level= element.levelName;
      });
     }, err => {
       console.log(err)
     })
  }
  interval
  openMessage(){
    console.log(this.add)
    if(this.add)
    document.getElementById("dialog2").style.display="block"
    else
    document.getElementById("dialog").style.display="block"
    let x=0
     this.interval = setInterval(() => {
    x++
    if(x==5){
    this.closeMessage()
    }
    console.log(x)
    },1000)
  }
  closeMessage(){
    clearInterval(this.interval)
    document.getElementById("dialog").style.display="none"
    document.getElementById("dialog2").style.display="none"
  }
  AddMenu(){
    let meals:Meal[]=this.menu.meals;
    meals.forEach(element => {
      element.mealCode=0;
    });
     let m:Menu=new Menu(0,this.menu.menuName,this.menu.discription,this.u.userCode,new Date(),null,0,this.u.userName,null,this.menu.pictureCode,false,this.menu.levelCode,meals,this.menu.menuCategoryCode)
     console.log(m)
     this.ser.AddMenuToUser(m).subscribe(succ=>{
      console.log(succ)   
      this.menu.userCode=this.code
      console.log(this.menu)
      this.add=true
      this.closeMessage()
      this.openMessage()
    },err=>{
      console.log(err)
    })
  }
  DeletMenu(){
    this.menu.userCode=this.u.userCode
      this.ser.DeleteMenu(this.menu).subscribe(succ=>{
        console.log(succ)
        this.menu.userCode=this.code
        this.add=false
        this.closeMessage()
        this.openMessage()
      },err=>{console.log(err)})
   }

  
}




