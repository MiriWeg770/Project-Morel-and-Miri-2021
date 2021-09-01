import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-my-menus',
  templateUrl: './my-menus.component.html',
  styleUrls: ['./my-menus.component.css']
})
export class MyMenusComponent implements OnInit {
  listMenus:Menu[]=[
    new Menu(null,"ארוחת בוקר","ccc",null,new Date(2000-25-25),null,null,1,null),
   ,
  ]; 
    u: User = new User(1, null, null, null);
    choose = false
    add = false
    newMenu: Menu = new Menu(1,null,null,1,null,null,null,1,null);
    ELEMENT_DATA: Menu[] =[
      new Menu(1,"ארוחת בוקר","ccc",1,new Date(2000-25-25),null,null,1,null),
      new Menu(1,"ארוחת בוקר","ccc",1,new Date(2000-25-25),null,null,1,null),
      new Menu(1,"ארוחת בוקר","ccc",1,new Date(2000-25-25),null,null,1,null)
    ]
    click = false
    dataSource;
    length = this.ELEMENT_DATA.length;

    displayedColumns: string[] = ['y', 'MenuName', 'NumberOfDiners', 'countMeals', 'Date', 'x'];

    constructor(private dialog:MatDialog,private ser:MenuService) {
     this.u= JSON.parse(localStorage.getItem("user"));
     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

     }
  
    ngOnInit(): void {
      // this.GetAllMenus();
    }
  
    GetAllMenus(){
      this.ser.GetAllMenusByIdUser(this.u.userCode).subscribe(succ => {
       this.ELEMENT_DATA = succ;
       this.length= this.ELEMENT_DATA.length;
       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
       console.log(this.ELEMENT_DATA);
     }, err => {
        console.log(err);
      }) 
   }
     applyFilter(event: Event) {
       const filterValue = (event.target as HTMLInputElement).value;
       this.dataSource.filter = filterValue.trim().toLowerCase();
     }
  
     AddMenu(){
     const dialogRef = this.dialog.open(AddMenuComponent, {
     disableClose:true,
     autoFocus:false
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');    
         this.GetAllMenus()
    });  
  
   }
   UpdateMenu(x:Menu){
     const dialogRef = this.dialog.open(AddMenuComponent, {
     disableClose:true,
     autoFocus:false,
     data:x
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.GetAllMenus()
       console.log(result)
    });
   }
  
   checked:Menu[]=[]
   check(x:Menu){
     if(!this.checked.includes(x))
       this.checked.push(x) 
   console.log(this.checked)
   }
  
     delet=false;
     Delet(x:Menu,d=false) {
      //  console.log(x)
      //  const dialogRef = this.dialog.open(DeletMealComponent, {
      //    width: '20%',
      //    data: d
      //  });
      //  dialogRef.afterClosed().subscribe(result => {
      //    console.log('The dialog was closed');
      //    if(result){
      //    this.ser.DeleteMeal(x).subscribe(succ=>{
      //    console.log(succ)  
      //   this.GetAllMeals();
      //    },err => {
      //      console.log(err);
      //    }) }
      //  });
   }
  
  
  //  DeletItems(){
  //    this.checked.forEach(element => {
  //        this.Delet(element,true)
  //    });
  //  }
 }
