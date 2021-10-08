import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
// import { runInThisContext } from 'vm';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { DeletMealComponent } from '../delet-meal/delet-meal.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UserService } from '../user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MealService } from '../meal.service';
import { Product } from 'src/Models/Product';
import { DownloadComponent } from '../download/download.component';
import { RemoveShareComponent } from '../remove-share/remove-share.component';
import { MealCategoriesService } from '../meal-categories.service';
import { MealCategories } from 'src/Models/MealCategories';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LevelService } from '../level.service';
import { Level } from 'src/Models/Level';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class MyMealsComponent implements OnInit {
  u: User = new User(0, null, null, null);
  choose = false
  add = false
  // newMeal: Meal = new Meal(0, null, null, 0, null, 0, 0, 0, null, null,null);
  ELEMENT_DATA: Meal[] = [];
  length = 0;
  dataSource;
  click = false
  displayedColumns: string[] = [
    'y','s','MealName','Category','Level',  'NumberOfDiners', 'countIngredients', 'DateCreated','DateUpdated','NumberOfViews', 'x'];

  // expandedElement: Meal | null;
  c:MealCategories[]
  levels:Level[]=[]

  constructor(private dialog:MatDialog,private _snackBar: MatSnackBar, private serc:MealCategoriesService,private ser:UserService,private serm:MealService,private serl:LevelService,private router:Router) {
         this.u= JSON.parse(localStorage.getItem("user") );
         console.log(this.u)        
       
        this.GetCategories()
         this.GetAllMeals()
         this.GetLevels()
         
   }

   ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  count:number[]=[]
  GetAllMeals(){
     this.ser.GetUserMeals(this.u.userCode).subscribe(succ => {
      this.ELEMENT_DATA = succ;
      this.length= this.ELEMENT_DATA.length;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
       
      this.ELEMENT_DATA.forEach(element => {
        this.serm.GetProductsMeal(element.mealCode).subscribe(succ=>{
        element.products=succ
        })
      },err=>{
        console.log(err)
      });
      
      console.log(this.ELEMENT_DATA);
    }, err => {
       console.log(err);
     }) 
  }

   
 
  AddMeal(){
    const dialogRef = this.dialog.open(AddMealComponent, {
    disableClose:true,
    autoFocus:false,
    panelClass:'my-dialog',
    width:'100%',
    height:'100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');    
        this.GetAllMeals()
   });  
  }
  
  UpdateMeal(x:Meal){
    console.log(x)
    const dialogRef = this.dialog.open(AddMealComponent, {
    disableClose:true,
    autoFocus:false,
    data:x,
    panelClass:'my-dialog',
    width:'100%',
    height:'100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetAllMeals()
      console.log(result)
   });
  }
  checked:Meal[]=[]
  check(x:Meal){
    if(!this.checked.includes(x))
       this.checked.push(x) 
       console.log(this.checked)
  }

    delet=false;
    Delet(x:Meal,d=false) {
      console.log(x)
      const dialogRef = this.dialog.open(DeletMealComponent, {
        width: '20%',
        data: d
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
         this._snackBar.open(" נמחק  "+x.mealName, "סגור",{
            horizontalPosition: 'start',
            verticalPosition:'bottom' 
            });
          

        this.serm.DeleteMeal(x).subscribe(succ=>{
        console.log(succ)  
        this.GetAllMeals();
        },err => {
          console.log(err);
        }) }
      });
  }


  DeletItems(){        
    this.Delet(this.checked[0],true)
    this.checked.forEach(element => {
      this.serm.DeleteMeal(element).subscribe(succ=>{
        console.log(succ)  
        this.GetAllMeals();
        },err => {
          console.log(err);
        }) })

  }

  download(x:Meal){
    const dialogRef = this.dialog.open(DownloadComponent, {
      // disableClose:true,
      data: x
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    //   console.log(result)
    //   x.numberOfDiners=result
    //   this.serm.UpdateMeal(x).subscribe(succ=>{
    //     console.log(succ)
    //   },err=>{console.log(err)})
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
 shareOne(x:Meal){
  x.publish=true,
  x.dateUplaod=new Date()
  this.serm.UpdateMeal(x).subscribe(succ=>{
    console.log("share")
   console.log(succ)
  },err=>{console.log(err)})
}
 
   DateCreated(x:Meal){
    let d:Date= new Date(x.dateCreated)
    return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  }
  DateUpdated(x:Meal){
    let d:Date= new Date( x.dateUpdated)
    if(x.dateUpdated!=null)
      return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    else
      return ""
  }

  removeShare(x:Meal) {
    console.log(x)
    const dialogRef = this.dialog.open(RemoveShareComponent, {
      width: '20%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
      x.publish=false;
      this.serm.UpdateMeal(x).subscribe(succ=>{
      console.log(succ)  
      this.GetAllMeals();
      },err => {
        console.log(err);
      }) }
    });
}

GetCategories(){
  this.serc.GetAllCategories().subscribe(succ => {
    this.c=succ   
    console.log(this.c)      
   }, err => {
     console.log(err)
   })
}
GetLevels(){
  this.serl.GetAllLevels().subscribe(succ => {
    this.levels=succ   
   }, err => {
     console.log(err)
   })
}
Category(x:Meal){
  let ca:string;
  this.c.forEach(element => {
    if(element.mealCategoriesCode==x.mealCategoryCode)
      ca= element.mealCategoriesName;
  });
  return ca;
}
Level(x:Meal){
  let le:string;
  this.levels.forEach(element => {
    if(element.levelCode==x.levelCode)
      le= element.levelName;
  });
  return le;
}


  


}

