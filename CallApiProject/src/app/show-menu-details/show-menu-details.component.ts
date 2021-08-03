import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/Models/Meal';

@Component({
  selector: 'app-show-menu-details',
  templateUrl: './show-menu-details.component.html',
  styleUrls: ['./show-menu-details.component.css']
})
export class ShowMenuDetailsComponent implements OnInit {

  listMeals:Meal[]=[
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
  ] 
  constructor() { }

  ngOnInit(): void {
  }
 
}
