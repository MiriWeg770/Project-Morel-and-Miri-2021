import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { Product } from 'src/Models/Product';
import { MealService } from '../meal.service';
import { ShowMenuDetailsComponent } from '../show-menu-details/show-menu-details.component';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.css']
})
export class AllListsComponent implements OnInit {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  listMeals: Meal[] = [];
  listMenus: Menu[] = [
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j"),
    new Menu(1, "menu", "discription", 1, new Date(1, 1, 1), "1", 1, "j")


  ];

  constructor(public dialog: MatDialog, private mealService: MealService) {
    this.mealService.GetAllMeals().subscribe(dataList => {
      this.listMeals = dataList; console.log(this.listMeals);
    });
  }

  ngOnInit(): void {

  }
  // showDetails(){
  //   const dialogRef=this.dialog.open(ShowMenuDetailsComponent,{
  //     width:'1000px',
  //     panelClass: '.dialog-container',
  //     data:{
  //       data:{

  //    }

  //   }}); 
  // }



}