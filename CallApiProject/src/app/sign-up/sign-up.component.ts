import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  myUser:User= new User(0,null,null,null,null,null);
  forget=false
  pass:boolean
  checked1:boolean;
  checked2:boolean;
  newCode:string="";
  code:string="";
  password1:string;
  password3:string;
  password2:string;

  constructor(private ser:UserService,private router:Router,private _snackBar:MatSnackBar 
    ,public dialogRef: MatDialogRef<SignUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {
      if(data)
        this.checked1=true
      else
        this.checked2=true
  }
  ngOnInit(): void { }

  openSnackBar() {
    this._snackBar.open("קיים כבר משתמש כזה", "סגור",{
        horizontalPosition: 'center',
        verticalPosition:'top' 
    });
  }
  SignIn(){
    this.pro=!this.pro;
    this.ser.SignIn(this.myUser).subscribe(succ => { 
      if(succ!=null){ 
       this.ser.GetUserById(succ.userCode).subscribe(s=>{
        this.myUser=s
        console.log(this.myUser)
          localStorage.setItem("user", JSON.stringify(this.myUser));
         window.location.reload()       
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
  SignUp(){
    this.pro=!this.pro;
    if(this.myUser.password==this.password2){
      this.myUser.manager=false
      this.ser.SignUp(this.myUser).subscribe(succ => {  
          console.log(succ);
          this.myUser=succ        
      localStorage.setItem("user", JSON.stringify(this.myUser));    
      this.router.navigate(["/Home"])
      window.location.reload()
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
 sendEmail(){
    if(this.myUser.mail!=""){
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
  changePass(){
  if(this.password1!=this.password3)
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
   this.forget=!this.forget
   this._snackBar.open("הסיסמה הוחלפה בהצלחה ", "סגור!!",{
    horizontalPosition: 'center',
    verticalPosition:'top'
   });
    }  
    
  }
}
