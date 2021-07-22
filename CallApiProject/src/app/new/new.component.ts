import { Component, OnInit } from '@angular/core';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  u:User;
  constructor() { 
   this.u= JSON.parse(localStorage.getItem("user"));
  }
  ngOnInit(): void {
  }

}
