import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { LogOutComponent } from '../log-out/log-out.component';
import { MyAccountComponent } from '../my-account/my-account.component';
import { UserComponent } from '../user/user.component';
// import { LogOutComponent } from '../log-out/log-out.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 sort:string[]=["הכל","פופולרי","לפי תאריך","לפי מנות","לפי תפריטים",]

  u:User;
  @Output() 
  toggleSidebarForMe:EventEmitter<any>=new EventEmitter();

  constructor(private router:Router,public dialog:MatDialog) {
   this.u= JSON.parse(localStorage.getItem("user"));
   console.log(this.u)
}
  ngOnInit(): void {     

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
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed'); 
              this.u= JSON.parse(localStorage.getItem("user"));
      
           });  
          }
          
}


