import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/Models/User';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';



@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  constructor(private router:Router,public dialogRef: MatDialogRef<MyAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,private ser:UserService) { 
  }
 

  ngOnInit(): void {

  }
  signOut(){
    localStorage.removeItem("user")
    window.location.reload(); 
    this.router.navigate(["/Home"])
  }
 save(){
 this.ser.UpdateUser(this.data).subscribe(succ=>{
   console.log(succ)
  },err=>{console.log(err)})
 }
}
