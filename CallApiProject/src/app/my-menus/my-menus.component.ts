import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-my-menus',
  templateUrl: './my-menus.component.html',
  styleUrls: ['./my-menus.component.css']
})
export class MyMenusComponent implements OnInit {
 u:User;
 listMenus:Menu[];
  constructor() {
   this.u= JSON.parse(localStorage.getItem("user"));

   }

  ngOnInit(): void {
  }

}
