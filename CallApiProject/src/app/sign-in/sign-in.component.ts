import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { UserService } from '../user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // user:User;
  hide:boolean=true;
  pro:boolean=false;
  myUser:User= new User(1,null,null,null);
  forget=false
  constructor(private ser:UserService,private router:Router,public dialog:MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    
    
  }
  // SignIn(){
  //     this.ser.SignIn(this.myUser).subscribe(succ => {
  //       console.log(succ);
  //       localStorage.setItem("user", JSON.stringify(this.myUser));
  //        this.router.navigate(["/MyHome"])
  //     }, err => {
  //       console.log(err);
  //       // console.log(this.usersArr);
  //     })   
         
  //   }
  openSnackBar() {
    this._snackBar.open("   לא קיים משתמש כזה", "סגור",{
        horizontalPosition: 'center',
        verticalPosition:'top' 
    });
  }

  SignIn(){
    this.pro=!this.pro;
    this.ser.SignIn(this.myUser).subscribe(succ => { 
      if(succ!=null){
       this.myUser=succ
       console.log(this.myUser)    
      localStorage.setItem("user", JSON.stringify(this.myUser));    
       this.router.navigate(["/Home"])
      }
      else{
        this.pro=!this.pro
        this._snackBar.open("   סיסמה לא נכונה   ", "סגור",{
          horizontalPosition: 'center',
          verticalPosition:'top' 
      });      }
    }, err => {
      console.log(err);
      this.pro=!this.pro
      this.openSnackBar()
    })   
   
       
  }




  openDialog(){
  //  this.dialog.open(ResetPasswordComponent);
  document.getElementById("over").style.opacity="1";
  }
 
}
