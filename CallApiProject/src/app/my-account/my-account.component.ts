import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/Models/User';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  u:User;
  constructor(private router:Router) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    console.log(this.u)
  }
 

  ngOnInit(): void {

  }
  signOut(){
    localStorage.removeItem("user")
    this.router.navigate(["/Home"])
  }

}
