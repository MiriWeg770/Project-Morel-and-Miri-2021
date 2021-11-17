import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-make-account',
  templateUrl: './make-account.component.html',
  styleUrls: ['./make-account.component.css']
})
export class MakeAccountComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
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
