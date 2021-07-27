import { Component, OnInit } from '@angular/core';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  User:User= new User(null,null,null,null);
  hide:boolean=true;
  isLinear=false
  constructor() {

   }

  ngOnInit(): void {
  
  }
  ResetPassword(){
    
  }

}
