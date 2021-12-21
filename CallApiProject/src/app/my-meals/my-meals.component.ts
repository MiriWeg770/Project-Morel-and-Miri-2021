import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { AddMealComponent } from '../add-meal/add-meal.component';
import { DeletMealComponent } from '../delet-meal/delet-meal.component';
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
import { ShareComponent } from '../share/share.component';
import { DeletPublishedMealComponent } from '../delet-published-meal/delet-published-meal.component';
import { PictureService } from '../picture.service';
import { Picture } from 'src/Models/Picture';
import { RemoveShareToUpdateComponent } from '../remove-share-to-update/remove-share-to-update.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UnitMeasureService } from '../unit-measure.service';
import { UnitMeasure } from 'src/Models/UnitMeasure';

@Component({
  selector: 'app-my-meals',
  templateUrl: './my-meals.component.html',
  styleUrls: ['./my-meals.component.css'],
})
export class MyMealsComponent implements OnInit {
  u: User = new User(0, null, null, null,null,null);
  ELEMENT_DATA: Meal[] = [];
  c:MealCategories[]=[]
  levels:Level[]=[]
  pictures:Picture[]=[]
  loader=true
  text:string=""
  find:Meal[]=[]
  arr:Meal[]=[]
  constructor( private seru:UnitMeasureService, private dialog:MatDialog,private _snackBar: MatSnackBar,private serp:PictureService, private serc:MealCategoriesService,private ser:UserService,private serm:MealService,private serl:LevelService,private router:Router) {
         this.u= JSON.parse(localStorage.getItem("user") );
         this.GetCategories()
         this.GetAllMeals()
         this.GetLevels()
         this.GetAllUnitMeasures()
           
   }
   ngOnInit(): void {
  }

  GetAllMeals(){
     this.ser.GetUserMeals(this.u.userCode).subscribe(succ => {
      this.ELEMENT_DATA = succ;   
      this.arr=succ;    
      this.GetPictures()
      this.ELEMENT_DATA.forEach(element => {
        this.serm.GetProductsMeal(element.mealCode).subscribe(succ=>{
        element.products=succ
        },err=>{console.log(err)})
      },err=>{
        console.log(err)
      });
    }, err => {
       console.log(err);
     }) 
  }
  GetPictures(){
    this.ELEMENT_DATA.forEach(element => { 
    this.serp.GetPictureById(element.pictureCode).subscribe(succ=>{
      this.pictures.push(succ) 
    if(this.pictures.length==this.ELEMENT_DATA.length){
      console.log(this.pictures)
      this.GetAllMeals()
      this.loader=false
    }
  },err=>{console.log(err)})
});
  }
  checkPic(x:number){
    let url;
   this.pictures.forEach(element => {
     if(element.pictureCode==x)
       url=element.pictureName
   });
   return url;
  }
  AddMeal(){
    const dialogRef = this.dialog.open(AddMealComponent, {
    disableClose:true,
    autoFocus:false,
    panelClass:'my-dialog',
    width:'70%',
    height:'100%',
    });
    dialogRef.afterClosed().subscribe(result => {
        this.GetAllMeals()
   });  
  }
  UpdateMeal(x:Meal){
    console.log(x)
    if(!x.publish){
    const dialogRef = this.dialog.open(AddMealComponent, {
    disableClose:true,
    autoFocus:false,
    data:x,
    panelClass:'my-dialog',
    width:'70%',
    height:'100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.GetAllMeals()
   });
   }
   else{
    const dialogRef = this.dialog.open(RemoveShareToUpdateComponent, {
      width: '20%',
      data:false
    });
   } 
  }
  Delet(x:Meal) {
      console.log(x)
      let dialogRef;
      if(x.publish){
        dialogRef = this.dialog.open(DeletPublishedMealComponent, {
        width: '20%',
      });
      }
      else{
         dialogRef = this.dialog.open(DeletMealComponent, {
          width: '20%',
        });
      }
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result){
         this._snackBar.open(" נמחק  "+x.mealName, "סגור",{
            horizontalPosition: 'start',
            verticalPosition:'bottom' 
            });       
        this.serm.DeleteMeal(x).subscribe(succ=>{
        this.GetAllMeals();
        },err => {
          console.log(err);
        }) }
      });
  }
  downloadMeal:Meal=null
  download(x:Meal){
    this.downloadMeal=x; 
       console.log(this.downloadMeal)
    this.UnitMeasure(x)
    
    document.getElementById("d").style.display="block";  
  var data = document.getElementById('d')  
     html2canvas(data).then(canvas=>{
     const contentDataUrl = canvas.toDataURL('image/png')
     let pdf =  new jsPDF('l','mm','a4')
    pdf.addImage(contentDataUrl, 'PNG', 0, 0, 295, canvas.height*309/canvas.width)
    pdf.save(x.mealName+"-מתכון");  
    document.getElementById("d").style.display="none";
  
    }) 
  }
 shareOne(x:Meal){
  x.publish=true,
  x.dateUplaod=new Date()
  x.numberOfViews=0
  this.serm.UpdateMeal(x).subscribe(succ=>{
    console.log("share")
   console.log(succ)
   const dialogRef = this.dialog.open(ShareComponent, {
    data:x
  });
  },err=>{
   console.log(err) 
})
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
search(){
  if(this.text==""){
    this.ELEMENT_DATA=this.arr
  }
  else{
    console.log(this.text)
    this.find.length=0;
    this.ELEMENT_DATA=this.arr
    this.ELEMENT_DATA.forEach(element => {
    if(element.mealName.includes(this.text)){ 
    this.find.push(element);  
 }
});
 this.ELEMENT_DATA=this.find
}}
UnitMeasures:string[]=[]
unit:UnitMeasure[]=[]

GetAllUnitMeasures(){
  this.seru.GetAllUnitMeasures().subscribe(succ=>{
   this.unit=succ
  },err=>{console.log(err)} ) 
}
UnitMeasure(x:Meal){
  console.log(x.products)
    x.products.forEach(element => {
      for (let index = 0; index < this.unit.length; index++) {
        if(element.unitMeasureCode==this.unit[index].unitCode){
           let x=""
            if(element.amountInMeal>1){
             switch (this.unit[index].unitName) {        
              case "יחידה":x="יחידות";break;
              case "כף":x="כפות";break;                                 
              case "כפית":x="כפיות";break;
              case "ליטר":x="ליטרים";break;
              case "כוס":x="כוסות";break;
              default:x=this.unit[index].unitName;break;
            }
             this.UnitMeasures.push(x)       
            }      
            else{this.UnitMeasures.push(this.unit[index].unitName)}                                  
        }         
      }
    }); 
}
}

