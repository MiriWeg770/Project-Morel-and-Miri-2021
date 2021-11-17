import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesToMenu } from 'src/Models/CategoriesToMenu';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { MenuCategories } from 'src/Models/MenuCategories';
import { User } from 'src/Models/User';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';
import { UserService } from '../user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Level } from 'src/Models/Level';
import { LevelService } from '../level.service';
import { PictureService } from '../picture.service';
import { Picture } from 'src/Models/Picture';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
 u:User
  newMenu: Menu = new Menu(0, null, null, null, new Date(), null, null, null, null,null,null,null,null,null)
  newMenuCategories: CategoriesToMenu = new CategoriesToMenu(0, 0, 0);
  selectCa: string
  categories: MenuCategories[];
  // listMeals: Meal[] = []
  MenuList: Meal[] = []
  levels:Level[]
  selectLe:string
  ELEMENT_DATA: Meal[] = [];
 open=true
 add=false
  constructor(private seru: UserService,private serp:PictureService,private ser: MenuService,private serl:LevelService,private serm:MealService,private dialog:MatDialog, private dialogRef: MatDialogRef<AddMealComponent>,@Inject(MAT_DIALOG_DATA) public data: Menu) {
    this.u=JSON.parse(localStorage.getItem("user"));
    this.GetAllMeals()
    this.GetLevels()
    this.GetPictures()
    if (data != null) {
      this.newMenu = data
      console.log(this.newMenu)  
     ser.GetMenuMeals(this.newMenu.menuCode).subscribe(succ=>{
     this.MenuList=succ  
     this.MenuList.forEach(element => {
      element.mealCode=0
    });
     console.log(this.MenuList)

     },err=>{
     console.log(err)
    })
    serl.GetLevelById(this.newMenu.levelCode).subscribe(succ => {
      this.selectLe = succ.levelName
    }, err => {
      console.log(err)
    }) 
  } 
} 

  ngOnInit(): void {
  }

  GetAllMeals(){
    this.seru.GetUserMeals(this.u.userCode).subscribe(succ => {
     this.ELEMENT_DATA = succ;
     this.ELEMENT_DATA.forEach(element => {
       element.mealCode=0
     });
     console.log(this.ELEMENT_DATA)
     },err=>{
       console.log(err)
     });
 }


  GetCategories() {
    this.ser.GetAllCategories().subscribe(succ => {
      this.categories = succ
      console.log(succ)
    }, err => {
      console.log(err)
    })
  }

  // s() {
  //   this.newMenu.userCode=this.u.userCode
  //   console.log(this.newMenu)
  //   console.log(this.selectCa)
  //   this.categories.find(element => {
  //     if (element.menuCategoriesName == this.selectCa) {
  //       this.newMenuCategories.menuCategoriesCode = element.menuCategoriesCode
  //     }
  //   });
  //   this.ser.AddMenuToUser(this.newMenu).subscribe(data => {
  //     this.newMenuCategories.menuCode = data.menuCode;
  //     this.newMenuCategories.categoriesToMenuCode

  //     this.ser.AddCategoriesToMenu(this.newMenuCategories).subscribe();
  //     console.log(data);
  //   }, err => {
  //     console.log(err);
  //   })
  // }
  closeDialog() {
    this.dialogRef.close();
  }


 Add(x:Meal){
   console.log(x)
   if(this.MenuList.includes(x))  
   this.MenuList.splice(this.MenuList.indexOf(x), 1);
   else
      this.MenuList.push(x)
  console.log(this.MenuList)
 }

  saveMenu(){ 
    this.newMenu.userCode=this.u.userCode
    this.newMenu.meals=this.MenuList
    this.levels.forEach(element => {
      if (element.levelName == this.selectLe)
        this.newMenu.levelCode = element.levelCode
    });
    this.MenuList.forEach(element => {
      element.mealCode=0
    });
    this.ser.AddMenuToUser(this.newMenu).subscribe(succ=>{
    console.log(succ)
    
    },err=>{console.log(err)})
    
  }

  updateMenu() {
    this.newMenu.dateUpdated=new Date()
    this.levels.forEach(element => {
      if (element.levelName == this.selectLe)
        this.newMenu.levelCode = element.levelCode
    });
    console.log(this.newMenu) 
    this.ser.UpdateMenu(this.newMenu).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
    })
  }

  GetLevels() {
    this.serl.GetAllLevels().subscribe(succ => {
      this.levels = succ
      console.log(succ)
    }, err => {
      console.log(err)
    })
  }
 
  pictures:Picture[]=[]
  GetPictures(){
    this.serp.GetAllPictures().subscribe(succ=>{
      this.pictures=succ
      console.log(this.pictures)
   },err=>{
     console.log(err)
   })
  }
  GetPicture(x:Meal){
    let url=" ";
    this.pictures.forEach(element => {
     if(element.pictureCode==x.pictureCode)
        url= element.pictureName
   });
   return url
  }

Open(){
  this.open=true
  console.log(this.open)
}


change(){
  this.open=!this.open
  this.add=!this.add
}
editMeal(x:Meal){
  console.log(x)
  const dialogRef = this.dialog.open(AddMealComponent, {
  disableClose:true,
  autoFocus:false,
  data:x,
  panelClass:'my-dialog',
  width:'80%',
  height:'100%',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.GetAllMeals()
    console.log(result)
    x=result
 });

}
}
