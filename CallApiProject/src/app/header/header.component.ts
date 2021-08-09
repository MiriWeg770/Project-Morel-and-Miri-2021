import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';
import { LogOutComponent } from '../log-out/log-out.component';
// import { LogOutComponent } from '../log-out/log-out.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 sort:string[]=["הכל","פופולרי","לפי תאריך","לפי מנות","לפי תפריטים",]
  // name:string;
  // mail:null;
  u:User;
  name:string;
  @Output() toggleSidebarForMe:EventEmitter<any>=new EventEmitter();

  constructor(private router:Router,public dialog:MatDialog) {
     this.u= JSON.parse(localStorage.getItem("user"));
     this.name= this.u.UserName;
    // this.mail=u.Mail;
   }

  ngOnInit(): void {
  }
  // toggleSidebar(){
  //   this.toggleSidebarForMe.emit();
  // }
    openDialog(){
      
      this.dialog.open(LogOutComponent);
     }
}
