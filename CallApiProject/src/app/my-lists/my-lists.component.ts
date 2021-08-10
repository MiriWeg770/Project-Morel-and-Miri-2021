import { Component, OnInit } from '@angular/core';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css']
})
export class MyListsComponent implements OnInit {
u:User;
  constructor() {
    this.u= JSON.parse(localStorage.getItem("user"));

   }

  ngOnInit(): void {
  }

}
