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
 u:User=new User(null,"morel",null,null)
  constructor(private router:Router,public dialog:MatDialog) { 
    // this.u= JSON.parse(localStorage.getItem("user"));
    console.log(this.u)
  }

  ngOnInit(): void {
  }

  out(){
    localStorage.removeItem("user");
    this.router.navigate(["/Home"]);
  }

  myAccount(){
    const dialogRef = this.dialog.open(MyAccountComponent, {
      width: '30%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  off(){
    document.getElementById("overlay").style.display="none";
  }
  on(){
    document.getElementById("overlay").style.display="block";
  }
}

