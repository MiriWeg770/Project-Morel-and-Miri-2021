import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  u:User; 
   
  @Input() menu:Menu;
  constructor(private ser:MenuService,private _snackBar:MatSnackBar,private dialog:MatDialog) { 
    this.u= JSON.parse(localStorage.getItem("user"));

  }

  ngOnInit(): void {
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
}
