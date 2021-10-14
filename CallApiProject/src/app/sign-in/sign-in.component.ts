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
  myUser:User= new User(0,null,null,null);
  forget=false
  code:string="";
  newCode:string="";
  constructor(private ser:UserService,private router:Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    
    
  }

  SignIn(){
    this.pro=!this.pro;
    this.ser.SignIn(this.myUser).subscribe(succ => { 
      if(succ!=null){ 
       this.ser.GetUserById(succ.userCode).subscribe(s=>{
        this.myUser=s
        console.log(this.myUser)
          localStorage.setItem("user", JSON.stringify(this.myUser));    
         this.router.navigate(["/Home"])
       })  
     
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
      this._snackBar.open("   לא קיים משתמש כזה", "סגור",{
        horizontalPosition: 'center',
        verticalPosition:'top' 
    });    
  })    
  }


pass:boolean
  sendEmail(){
    console.log("סיסמה חדשה")
    this.ser.sendMail(this.myUser).subscribe(succ=>{    
      this.newCode=succ.password;      
       console.log(this.newCode);    
      this._snackBar.open("נישלח הקוד  ", "סגור",{
        horizontalPosition: 'center',
        verticalPosition:'top' 
    });      
    },err=>{console.log(err)})  
  }
  check(){
    if(this.code==this.newCode)
     this.pass=true;
    else
    this._snackBar.open("קוד לא נכון ", "סגור",{
      horizontalPosition: 'center',
      verticalPosition:'top' 
  }); 
     
  }
  password1:string;
  password2:string;
  changePass(){
  if(this.password1!=this.password2)
   this._snackBar.open("  הסיסמאות לא תואמות ", "סגור",{
    horizontalPosition: 'center',
    verticalPosition:'top'
   });
    else{
      this.ser.GetAllUsers().subscribe(succ=>{
        succ.forEach(element => {
           if(element.mail==this.myUser.mail){
          this.myUser=element;
          this.myUser.password=this.password1;
          this.ser.UpdateUser(this.myUser).subscribe(succ=>{console.log(succ)},err=>{console.log(err)})
         } });
      })
   
    }

   
  }





 

 
}
