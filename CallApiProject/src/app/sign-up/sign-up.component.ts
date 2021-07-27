import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { UserService } from '../user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  pro:boolean=false;
  hide:boolean=true;
  myUser:User= new User(1,null,null,null);
  usersArr:User[]=[];

  constructor(private ser:UserService,private router:Router,private _snackBar: MatSnackBar) {
  }

  openSnackBar() {
    this._snackBar.open("קיים כבר משתמש כזה", "סגור",{
        horizontalPosition: 'center',
        verticalPosition:'top' 
    });
  }

    
  ngOnInit(): void { 
    
    
  }

  SignUp(pass){
    this.pro=!this.pro;
    if(this.myUser.Password==pass){
    this.ser.SignUp(this.myUser).subscribe(succ => {  
          console.log(succ);
          this.myUser=succ        
      localStorage.setItem("user", JSON.stringify(this.myUser));    
       this.router.navigate(["/MyHome/AllLists"])
    }, err => {
      console.log(err);
      this.pro=!this.pro
      this.openSnackBar()
    })   
       
  }
else{
  this.pro=!this.pro;
  console.log("error password");
}}

send(){

}

  // GetAllUsers(){
  //   this.ser.GetAllUsers().subscribe(s=>{
  //     this.usersArr=s; 
  //     console.log(s);
  //   },err=>{
  //     console.log(err);
  //   })
  //   console.log(this.usersArr);
  //  }
 
  
}
