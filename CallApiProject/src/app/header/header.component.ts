import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { title } from 'process';
import { User } from 'src/Models/User';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { MyAccountComponent } from '../my-account/my-account.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { UserService } from '../user.service';
// import { LogOutComponent } from '../log-out/log-out.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 sort:string[]=["הכל","פופולרי","לפי תאריך","לפי מנות","לפי תפריטים",]
  open=false
  u:User=new User(null,null,null,null,null,null);
  // name:string

  @Output() 
  toggleSidebarForMe:EventEmitter<any>=new EventEmitter();

  constructor(private router:Router,public dialog:MatDialog,private ser:UserService) {
      // this.name=this.u.userName;
          this.u= JSON.parse(localStorage.getItem("user"));  
          // this.u=ser.user;
         console.log(this.u)
}
  ngOnInit(): void {     

  }
  
      
  MyAccount(){
    const dialogRef = this.dialog.open(MyAccountComponent, {
    disableClose:true,
    autoFocus:false,
    data:this.u
    
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');     
      console.log(this.u) 
    
   });  
  }

  makeAccount(){
    const dialogRef = this.dialog.open(MakeAccountComponent, {  
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');      
  });
}
SignIn(){ 
  this.connect(false)
}
SignUp(){
 this.connect(true)
}

connect(x){
   const dialogRef = this.dialog.open(SignUpComponent, {  
    panelClass:'my-dialog',
    data:x
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');      
});
}
 openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

 closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
flag=false
openSearch(){
  if(!this.flag){
     document.getElementById("search-text").style.opacity = "0";
     this.flag=true
  }
  else{
    this.flag=false
     document.getElementById("search-text").style.opacity = "1";
  }   
}
text:string=""
search(){
   console.log(this.text)
   this.router.navigate(["/Home/SearchResults",{text:this.text}]).then(() => {
    window.location.reload();
  });
   
}
  
}


