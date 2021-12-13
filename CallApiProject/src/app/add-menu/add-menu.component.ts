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
import { MatTableDataSource } from '@angular/material/table';
import { MealCategoriesService } from '../meal-categories.service';
import { MealCategories } from 'src/Models/MealCategories';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/Models/Product';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CheckProductsComponent } from '../check-products/check-products.component';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
   u:User
  newMenu: Menu = new Menu(0, null, null, null, new Date(),null,0,null,null,null,false,null,null,null)
  newMenuCategories: CategoriesToMenu = new CategoriesToMenu(0, 0, 0);
  selectCa: string=null
  mealCategories:MealCategories[]=[]
  categories: MenuCategories[]=[];
  MenuList: Meal[] = []
  levels:Level[]
  selectLe:string
  ELEMENT_DATA: Meal[] = [];
  content1:boolean=true;
  content2:boolean;
  displayedColumns: string[] = ['name', 'category','level','count'];
  dataSource;
  empty=false
  loader=false
  edit=false


  constructor(private seru: UserService,private serp:PictureService,private ser: MenuService,private serl:LevelService,private sermc:MealCategoriesService,private serm:MealService,private dialog:MatDialog, 
    private dialogRef: MatDialogRef<AddMealComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: Menu,private _snackBar:MatSnackBar) {
    this.u=JSON.parse(localStorage.getItem("user"));
    this.GetLevels()

    if (data != null) {
      this.edit=true
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
    ser.GetCategoryById(this.newMenu.menuCategoryCode).subscribe(succ => {
      this.selectCa = succ.menuCategoriesName
      console.log(this.selectCa)
    }, err => {
      console.log(err)
    })
  } 
  this.GetCategories()
  this.GetMealCategories()
  this.GetAllMeals()
} 
  ngOnInit(): void {
  }

  interval
  openMessage(y:number){
    if(y==1)
    document.getElementById("dialog").style.display="block"
    else if(y==2)
    document.getElementById("dialog2").style.display="block"

    let x=0
     this.interval = setInterval(() => {
    x++
    if(x==2){
    this.closeMessage()
     if(y==1){
     this.dialogRef.close()
     this.closeMessage()}
    }
    console.log(x)
    },1000)
  }
  closeMessage(){
    clearInterval(this.interval)
    document.getElementById("dialog").style.display="none"
    document.getElementById("dialog2").style.display="none"
  }
  GetAllMeals(){
    this.seru.GetUserMeals(this.u.userCode).subscribe(succ => {
     this.ELEMENT_DATA = succ;
     this.dataSource=this.ELEMENT_DATA
     let arr:Meal[]=[]
     this.ELEMENT_DATA.forEach(element => {
      this.serm.GetProductsMeal(element.mealCode).subscribe(succ => {
       element.products=succ
      }, err => {
        console.log(err)
      }) 
       element.mealCode=0  
         this.MenuList.forEach(element2 => {
         if(element2.mealName==element.mealName)
           arr.push(element)
            
     });
     });
     this.MenuList=arr;
     console.log(this.MenuList)
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
  Add(x:Meal){
   console.log(x)
   if(this.MenuList.includes(x))  
   this.MenuList.splice(this.MenuList.indexOf(x), 1);
   else
      this.MenuList.push(x)
    console.log(this.MenuList)
 }
 details(){
   this.loader=true
  this.newMenu.userCode=this.u.userCode
  this.levels.forEach(element => {
    if (element.levelName == this.selectLe)
      this.newMenu.levelCode = element.levelCode
  });
  this.MenuList.forEach(element => {
    element.mealCode=0
    element.publish=false
    element.numberOfViews=0
    element.products.forEach(element1 => {
      element1.productCode=0
      element1.mealCode=0
    });
  });
  this.categories.forEach(element => {
    if (element.menuCategoriesName == this.selectCa)
      this.newMenu.menuCategoryCode = element.menuCategoriesCode
  }); 
   this.newMenu.meals=this.MenuList
   console.log(this.newMenu.meals)
 }
  saveMenu(){ 
    this.details()
    let x:Menu=this.newMenu
    if(x.menuName!=null && x.meals.length!=0 && x.discription!=null && x.menuCategoryCode!=null && x.levelCode!=null){
    this.ser.AddMenuToUser(this.newMenu).subscribe(succ=>{
    console.log(succ)
    this.loader=false
    this.openMessage(1)
      //   this._snackBar.open("התפריט התווסף בהצלחה!! ", "אישור",{
      // horizontalPosition: 'center',
      // verticalPosition:'top' 
      // });
    },err=>{console.log(err)})
    }
    else{
      this.openMessage(2)
      this.loader=false
      //       this._snackBar.open(" מלא את כל הפרטים", "אישור",{
      //   horizontalPosition: 'center',
      //   verticalPosition:'top' 
      //   });
      // console.log("err")
      // this.empty=true
    }
  }
  updateMenu() {
    this.details()
    this.newMenu.dateUpdated=new Date()
    let x:Menu=this.newMenu
    if(x.menuName!=null && x.meals.length!=0 && x.discription!=null && x.menuCategoryCode!=null && x.levelCode!=null){
        // this.newMenu.meals.forEach(element => {
    //       this.serm.DeleteMenuMeal(element).subscribe(succ=>{
    //         console.log(succ)        
    //   },err=>{console.log(err)})
    //  })
    console.log(this.newMenu)
     this.newMenu.meals=this.MenuList
      this.ser.UpdateMenu(this.newMenu).subscribe(succ=>{
        console.log(succ)
        this.loader=false
        this.openMessage(1)
        //         this._snackBar.open("התפריט התעדכן בהצלחה!! ", "אישור",{
        // horizontalPosition: 'center',
        // verticalPosition:'top' 
      // });
    },err=>{console.log(err)})
  } 
    else{
      console.log("err")
      this.openMessage(2)
      this.loader=false
      //       this._snackBar.open(" מלא את כל הפרטים", "אישור",{
      //   horizontalPosition: 'center',
      //   verticalPosition:'top' 
      //   });
      // console.log("err")
      // this.empty=true
    }
  }
  GetLevels() {
    this.serl.GetAllLevels().subscribe(succ => {
      this.levels = succ
      console.log(succ)
    }, err => {
      console.log(err)
    })
  }
  GetMealLevel(x:Meal){
      let le:string;
      this.levels.forEach(element => {
        if(element.levelCode==x.levelCode)
          le= element.levelName;
      });
      return le;
  }
  GetMealCategories(){
    this.sermc.GetAllCategories().subscribe(succ => {
      this.mealCategories = succ
      console.log(succ)
    }, err => {
      console.log(err)
    })
  }
  GetMealCategory(x:Meal){
    let le:string;
    this.mealCategories.forEach(element => {
      if(element.mealCategoriesCode==x.mealCategoryCode)
        le= element.mealCategoriesName;
    });
    return le;
  }
 check(x:number){
  switch (x) {
  case 1:this.content1=true;this.content2=false;break;
  case 2:this.content1=false;this.content2=true;break;
  default:console.log("err");break;
 }
 }
 checked(x:Meal){
   let bool=false
   this.MenuList.forEach(element => {
     if(x.mealName==element.mealName)
       bool=true
   });
   return bool
}
CheckProducts(){
 let p:string[]=[]
 let pro:Product[]=[]
 this.MenuList.forEach(element => {
   element.products.forEach(element2 => {
     if(p.includes(element2.productName))
        pro.push(element2)
      else
        p.push(element2.productName)
   });
 });
 const dialogRef=this.dialog.open(CheckProductsComponent,{
  data:pro
  })
  dialogRef.afterClosed().subscribe(result=>{
   console.log("sss")
    
  })
 console.log(pro)
}
}

