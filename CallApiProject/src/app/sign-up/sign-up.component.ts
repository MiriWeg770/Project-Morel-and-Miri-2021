import { Component, OnInit } from '@angular/core';
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
  myUser:User= new User(null,null,null,null);
  usersArr:User[]=[];

  constructor(private ser:UserService,private router:Router) {
  }
    
  ngOnInit(): void { 
    
    
  }

  SignUp(pass){
    this.pro=!this.pro;
    if(this.myUser.Password==pass){
    this.ser.AddUser(this.myUser).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
      // console.log(this.usersArr);
    })   
       localStorage.setItem("user", JSON.stringify(this.myUser));    
       this.router.navigate(["/MyHome/AllLists"])
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
