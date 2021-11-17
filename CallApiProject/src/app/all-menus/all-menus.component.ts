import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/Models/Menu';
import { MenuCategories } from 'src/Models/MenuCategories';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-all-menus',
  templateUrl: './all-menus.component.html',
  styleUrls: ['./all-menus.component.css']
})
export class AllMenusComponent implements OnInit {
listMenus:Menu[]=[]
choose=false
sortBy:string[]=["הכל","פופולרי","לפי תאריך עולה","לפי תאריך יורד"]
listCategories:MenuCategories[]=[]
  constructor(private ser:MenuService) { 
    this.GetAllMenus()
    this.GetAllCategories()
  }
  ngOnInit(): void {
  }

  GetAllMenus(){
    this.ser.GetAllMenus().subscribe(succ=>{
   this.listMenus=succ
   console.log(this.listMenus)
    },err=>{console.log(err)})
  }
  GetAllCategories(){
    this.ser.GetAllCategories().subscribe(succ=>{
    this.listCategories=succ
    },err=>{console.log(err)})
  }
  GetMealsByCategory(x:MenuCategories){
    let count=0
   this.listMenus.forEach(element => {
     if(element.menuCode==x.menuCategoriesCode)
      count++;
   });
   return count;
  }
 
}
