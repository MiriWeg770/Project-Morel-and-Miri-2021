import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/Models/User';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { MyAccountComponent } from '../my-account/my-account.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
u:User
name:string
  constructor(public dialog:MatDialog) { 
    this.u= JSON.parse(localStorage.getItem("user"));
   if(this.u!=null)
    this.name=this.u.userName
  }

  ngOnInit(): void {
  }

  MyAccount(){
    const dialogRef = this.dialog.open(MyAccountComponent, {
    disableClose:true,
    autoFocus:false,
    data:this.u
    
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');     
          this.u=result
          console.log(this.u) 

      // this.ser.UpdateUser(result).subscribe(succ=>{
      //   this.u=succ
      // },err=>{
      //   console.log(err)
      // })        
      //  this.u= JSON.parse(localStorage.getItem("user"));


   });  
  }

  makeAccount(){
    const dialogRef = this.dialog.open(MakeAccountComponent, {  
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');      
  });
}

   
  
}
