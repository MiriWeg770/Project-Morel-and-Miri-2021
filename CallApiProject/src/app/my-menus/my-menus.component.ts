import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  new Menu(null,"ארוחת בוקר","ccc",null,new Date(2000-25-25),null,null,null),
  new Menu(null,"ארוחת בוקר","ccc",null,new Date(2000-25-25),null,null,null),
  new Menu(null,"ארוחת בוקר","ccc",null,new Date(2000-25-25),null,null,null),
  new Menu(null,"ארוחת בוקר","ccc",null,new Date(2000-25-25),null,null,null),
  new Menu(null,"ארוחת בוקר","ccc",null,new Date(2000-25-25),null,null,null),
  new Menu(null,"ארוחת בוקר","ccc",null,new Date(2000-25-25),null,null,null),
]; 
length=this.listMenus.length;
 u:User=new User(11,null,null,null);
 choose=false
add=false
newMenu:Menu;
dataSource;

  constructor(private dialog:MatDialog,private ser:MenuService) {
   this.u= JSON.parse(localStorage.getItem("user"));

   }

  ngOnInit(): void {
  }



  
  GetAllMenus(){
    this.ser.GetAllMenus(this.u.UserCode).subscribe(succ => {
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

//  checked:menu[]=[]
//  check(x:Meal){
//    if(!this.checked.includes(x))
//      this.checked.push(x) 
//  console.log(this.checked)
//  }



//    delet=false;
//    Delet(x:menu,d=false) {
//      console.log(x)
//      const dialogRef = this.dialog.open(DeletMealComponent, {
//        width: '20%',
//        data: d
//      });
//      dialogRef.afterClosed().subscribe(result => {
//        console.log('The dialog was closed');
//        if(result){
//        this.serm.DeleteMeal(x).subscribe(succ=>{
//        console.log(succ)  
//       this.GetAllMeals();
//        },err => {
//          console.log(err);
//        }) }
//      });
//  }


//  DeletItems(){
//    this.checked.forEach(element => {
//        this.Delet(element,true)
//    });
//  }





}
