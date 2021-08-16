import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { MyAccountComponent } from '../my-account/my-account.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 show=true
 u:User;
  constructor(private router:Router,public dialog:MatDialog) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    console.log(this.u.userCode)
  }

  ngOnInit(): void {
  }

  out(){
    localStorage.removeItem("user");
    this.router.navigate(["/Home"]);
  }

  // myAccount(){
  //   const dialogRef = this.dialog.open(MyAccountComponent, {
  //     autoFocus:true,
  //     disableClose:true,

  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
      
  //   });
  // }

  open_close(event){
    if(event)
       document.getElementById("overlay").style.display="none";
    else
       document.getElementById("overlay").style.display="block";      
  }
}

