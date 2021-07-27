import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 myUser:User=null;
  constructor(private router:Router ) { }

  ngOnInit(): void {
  }
  continue(){
    
       localStorage.setItem("user", JSON.stringify(this.myUser));    
       this.router.navigate(["/MyHome/AllLists"])
  

}

}
