import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 show=true
 u:User
  constructor(private router:Router) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    console.log(this.u)
  }

  ngOnInit(): void {
  }

  out(){
    localStorage.removeItem("user");
    this.router.navigate(["/Home"]);
  }
}

