import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { Picture } from 'src/Models/Picture';
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

  u:User; 
   
  @Input() menu:Menu;
  constructor(private serp:PictureService, private ser:MenuService,private _snackBar:MatSnackBar,private serl:LevelService,private dialog:MatDialog) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    this.GetLevel()
  }

  ngOnInit(): void {
  }
  url;
  GetPicture(x:Meal){
  this.serp.GetPictureById(x.pictureCode).subscribe(succ=>{
    this.url=succ.pictureName
    console.log(this.url)
 },err=>{
   console.log(err)
 })
}

  add(){
    if(this.u!=null){
    let m:Menu=new Menu(0,this.menu.menuName,this.menu.discription,this.menu.userCode,new Date(),null,this.menu.links,null,this.u.userName,new Date(),this.menu.pictureCode,false,this.menu.levelCode,this.menu.meals)
    console.log(this.menu)
    this.ser.AddMenuToUser(m).subscribe(succ=>{
      console.log(succ)
      this._snackBar.open(" התפריט התווסף ", "סגור",{
        horizontalPosition: 'center',
        verticalPosition:'top' 
        });
    },err=>{
      console.log(err)
    })
  }
  else{
      const dialogRef = this.dialog.open(MakeAccountComponent, {  
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');      
    });
  
}}

  DateUplaod(){
    let d:Date= new Date( this.menu.dateUpload)
    return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  }
  
  
  count(){
    this.menu.viewsNumber=this.menu.viewsNumber+1;
    this.ser.UpdateMenu(this.menu).subscribe(succ=>{
    console.log(succ.viewsNumber)
    },err=>{console.log(err)})
  }
level:string="";
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
}
