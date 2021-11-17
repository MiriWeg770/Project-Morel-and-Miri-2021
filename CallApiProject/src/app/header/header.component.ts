import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { LogOutComponent } from '../log-out/log-out.component';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { MyAccountComponent } from '../my-account/my-account.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { UserService } from '../user.service';
import { UserComponent } from '../user/user.component';
// import { LogOutComponent } from '../log-out/log-out.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 sort:string[]=["הכל","פופולרי","לפי תאריך","לפי מנות","לפי תפריטים",]
  open=false
  u:User=new User(null,null,null,null);
  // name:string

  @Output() 
  toggleSidebarForMe:EventEmitter<any>=new EventEmitter();

  constructor(private router:Router,public dialog:MatDialog,private ser:UserService) {
      // this.name=this.u.userName;

}
  ngOnInit(): void {     
          this.u= JSON.parse(localStorage.getItem("user"));  

   console.log(this.u)
  }


  toggleSidebar(){
    this.toggleSidebarForMe.emit();
  }
   

      // open_close(){
         
      //      document.getElementById("overlay").style.display="block";      
      // }
      // open_close(event){
      //   if(event)
      //      document.getElementById("overlay").style.display="none";
      //   else
      //      document.getElementById("overlay").style.display="block";      
      //    console.log(this.u)
      //     }

        
        


  MyAccount(){
    const dialogRef = this.dialog.open(MyAccountComponent, {
    disableClose:true,
    autoFocus:false,
    data:this.u
    
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');     
      console.log(this.u) 
      

      // this.ser.UpdateUser(result).subscribe(succ=>{
      //   this.u=succ
      // },err=>{
      //   console.log(err)
      // })        
      //  this.u= JSON.parse(localStorage.getItem("user"));


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




  
}


