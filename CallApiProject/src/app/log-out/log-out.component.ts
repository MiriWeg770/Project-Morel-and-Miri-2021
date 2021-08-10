import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { MyAccountComponent } from '../my-account/my-account.component';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router:Router,private dialog:MatDialog) { }
  name:string;
  Mail:string;

  ngOnInit(): void {
    let u:User= JSON.parse(localStorage.getItem("user"));
    this.name= u.userName;
    this.Mail=u.mail;
  }
  

  SignOut(){   
    localStorage.removeItem("user");
    this.router.navigate(["/Home"]);
  }
  openDialog(){
    const dialogRef = this.dialog.open(MyAccountComponent, {
      width: '100%',
      // data: {u}
  });
}
  
}
