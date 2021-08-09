import { Component, OnInit } from '@angular/core';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.css']
})
export class MyHistoryComponent implements OnInit {
 historyList:string[]=["g","g","g","g","g","g"];
 clicked=false
  u:User;
  constructor() {
    this.u= JSON.parse(localStorage.getItem("user"));

   }
  ngOnInit(): void {
  }

}
