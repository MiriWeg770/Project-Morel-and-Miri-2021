import { Component, OnInit } from '@angular/core';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-my-shares',
  templateUrl: './my-shares.component.html',
  styleUrls: ['./my-shares.component.css']
})
export class MySharesComponent implements OnInit {
u:User;
  constructor() {
                this.u= JSON.parse(localStorage.getItem("user"));

   }

  ngOnInit(): void {
  }

}
