import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
u:User= new User(null,"morel","1","morel@gmail.com")
  constructor(private router:Router) { 
    // let u:User= JSON.parse(localStorage.getItem("user"));
  
  }
  

  ngOnInit(): void {
  }

}
