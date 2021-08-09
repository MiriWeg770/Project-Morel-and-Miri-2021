import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router:Router) { }
  name:string;
  Mail:string;

  ngOnInit(): void {
    let u:User= JSON.parse(localStorage.getItem("user"));
    this.name= u.UserName;
    this.Mail=u.Mail;
  }
  

  SignOut(){   
    localStorage.removeItem("user");
    this.router.navigate(["/Home"]);
  }
  
}
