import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Level } from 'src/Models/Level';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { DeletMealComponent } from '../delet-meal/delet-meal.component';
import { DeletMenuComponent } from '../delet-menu/delet-menu.component';
import { LevelService } from '../level.service';
// import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';
import { RemoveShareComponent } from '../remove-share/remove-share.component';
import { UserService } from '../user.service';


@Component({
  selector: 'app-my-menus',
  templateUrl: './my-menus.component.html',
  styleUrls: ['./my-menus.component.css']
})
export class MyMenusComponent implements OnInit {
    // listMenus:Menu[]=[]; 
    u: User = new User(null, null, null, null);
    choose = false
    add = false
    newMenu: Menu = new Menu(1,null,null,1,null,null,null,1,null,null,null,null,null,null);
    ELEMENT_DATA: Menu[] =[]
    click = false
    dataSource;
    length = this.ELEMENT_DATA.length;

    displayedColumns: string[] = ['y','s', 'MenuName','Level', 'countMeals', 'DateCreated','DateUpdated', 'x'];
    levels:Level[]=[]

    constructor(private dialog:MatDialog,private ser:UserService,private serl:LevelService,private _snackBar: MatSnackBar,private serm:MenuService) {
     this.u= JSON.parse(localStorage.getItem("user"));
     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
     this.GetAllMenus()
     this.GetLevels()

   
     }
  
    ngOnInit(): void {
    }
  

    GetMenuMeals(){
      this.ELEMENT_DATA.forEach(element => {
        this.serm.GetMenuMeals(element.menuCode).subscribe(succ => {
        element.meals= succ    
      }, err => {
        console.log(err)
      })
      }); 
    }
    GetAllMenus(){
      console.log(this.u.userCode)
      this.ser.GetUserMenus(this.u.userCode).subscribe(succ => {
       this.ELEMENT_DATA = succ;
       this.length= this.ELEMENT_DATA.length;
       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.GetMenuMeals()    
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
     autoFocus:false,
     height:'100%',
     width:'100%',
     panelClass:'my-dialog'
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
     data:x,
     height:'100%',
     width:'100%',
     panelClass:'my-dialog'
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
  
  
  
  
  //  DeletItems(){
  //    this.checked.forEach(element => {
  //        this.Delet(element,true)
  //    });
  //  }

  DateCreated(x:Menu){
    let d:Date= new Date( x.dateCreated)
    return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  }
  DateUpdated(x:Menu){
    let d:Date= new Date( x.dateUpdated)
    if(x.dateUpdated!=null)
      return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    else
      return ""
  }

  delet=false;
  Delet(x:Menu,d=false) {
    console.log(x)
    const dialogRef = this.dialog.open(DeletMenuComponent, {
      width: '20%',
      data: d
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
       this._snackBar.open(" נמחק  "+x.menuName, "סגור",{
          horizontalPosition: 'start',
          verticalPosition:'bottom' 
          });
        

      this.serm.DeleteMenu(x).subscribe(succ=>{
      console.log(succ)  
      this.GetAllMenus();
      },err => {
        console.log(err);
      }) }
    });
}


DeletItems(){
  this.checked.forEach(element => {
      this.Delet(element,true)
  });
}


share(){
  this.checked.forEach(element => {
   //  element.publish=true,
   //  element.dateUplaod=new Date()
   //  this.serm.UpdateMeal(element).subscribe(succ=>{
   //    console.log("share")
   // console.log(succ)
   //  },err=>{console.log(err)})
   this.shareOne(element)
  });
}
shareOne(x:Menu){
 x.publish=true,
 x.dateUpload=new Date()
 this.serm.UpdateMenu(x).subscribe(succ=>{
   console.log("share")
   console.log(succ)
 },err=>{console.log(err)})
}


removeShare(x:Menu) {
  console.log(x)
  const dialogRef = this.dialog.open(RemoveShareComponent, {
    width: '20%',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result){
    x.publish=false;
    this.serm.UpdateMenu(x).subscribe(succ=>{
    console.log(succ)  
    this.GetAllMenus();
    },err => {
      console.log(err);
    }) }
  });
}
GetLevels(){
  this.serl.GetAllLevels().subscribe(succ => {
    this.levels=succ   
   }, err => {
     console.log(err)
   })
}
Level(x:Menu){
  let le:string;
  this.levels.forEach(element => {
    if(element.levelCode==x.levelCode)
      le= element.levelName;
  });
  return le;
}


 }
