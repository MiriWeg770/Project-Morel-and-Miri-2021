import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Meal } from 'src/Models/Meal';
import { Product } from 'src/Models/Product';
import { UnitMeasure } from 'src/Models/UnitMeasure';
import { User } from 'src/Models/User';
import { ChangePeopleComponent } from '../change-people/change-people.component';
import { DownloadComponent } from '../download/download.component';
import { LevelService } from '../level.service';
import { MealCategoriesService } from '../meal-categories.service';
import { MealService } from '../meal.service';
import { PictureService } from '../picture.service';
import { UnitMeasureService } from '../unit-measure.service';
import { UserService } from '../user.service';
// import * as jsPDF from 'jspdf'
@Component({
  selector: 'app-show-meal-details',
  templateUrl: './show-meal-details.component.html',
  styleUrls: ['./show-meal-details.component.css']
})
export class ShowMealDetailsComponent implements OnInit {

  meal:Meal=new Meal(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
 
  // bgVariable:Boolean=false
  // headerVariable:boolean=false

  Instructions:string[]=[]
  more:Meal[]=[]
  u:User;
  count:number=0;
  category:string="";
  level:string="";
  products:Product[]=[]


  from:string="";
to:string="";
message:string="";
Namefrom:string="";
  constructor(private router:ActivatedRoute,private serp:PictureService ,private ser:MealService,private serc:MealCategoriesService,private seru:UnitMeasureService, private serl:LevelService,private serUser:UserService, private _snackBar: MatSnackBar,private dialog:MatDialog) { 
    this.u=JSON.parse(localStorage.getItem("user"))
    this.router.params.subscribe(parameters => {
      let code = +parameters["id"];
       ser.GetMealById(code).subscribe(succ=>{
        this.meal =succ
        this.GetProducts(this.meal.mealCode)
        console.log(this.meal)
        this.GetUser(this.meal.userCode) 
        this.GetInstructions()  
        this.count=this.meal.numberOfDiners 
        this.GetCategory()
        this.GetLevel()
        this.GetPicture(this.meal.pictureCode)
        // this.more=[]  
        // ser.GetAllMeals().subscribe(succ=>{
        // succ.forEach(element => {
        //   if(element.mealCategoryCode==this.meal.mealCategoryCode && element.mealCode!=this.meal.mealCode)
        //      if(this.more.length<5){
        //       this.serUser.GetUserById(element.userCode).subscribe(succ=>{
        //         element.userName=succ.userName
        //       },err=>{
        //         console.log(err)
        //       })
        //       this.more.push(element)
        //      }   
        // });            
        // console.log(this.more)    
        // console.log(this.meal)

      // },err=>{console.log(err)})
      },err=>{console.log(err)})
  
      });
}


  ngOnInit(): void {
  window.scrollTo(0,0)
}
 close(){
   document.getElementById("send").style.display="none";
 }
 open(){
  document.getElementById("send").style.display="block";
 }
 Date(){
   let d:Date=new Date(this.meal.dateUplaod)
   return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
 }
 
 addMeal(){
   if(this.u!=null){
   this.meal.userCode= this.u.userCode
   this.ser.AddMealToUser(this.meal).subscribe(succ=>{
     console.log(succ)   
     this._snackBar.open("המנה התווספה ", "סגור",{
      horizontalPosition: 'center',
      verticalPosition:'top' 
      });

   },err=>{
     console.log(err)
   })}
   else{
     alert("התחבר")
   }
 }

 GetProducts(code:number){
   this.ser.GetProductsMeal(code).subscribe(succ=>{
     console.log(succ)
    this.meal.products=succ;
    this.meal.products.forEach(prod => {
      prod.amountInMeal=prod.amount*this.count;
    });
    this.GetAllUnitMeasures()    
   },err=>{
     console.log(err)
   })
 }

 GetUser(id:number){
   this.serUser.GetUserById(id).subscribe(succ=>{
     
     this.meal.userName=succ.userName
   },err=>{
     console.log(err)
   })
 }

GetInstructions(){
  this.Instructions=[]
  let x:string=""
  for (let index = 0; index < this.meal.instructions.length; index++) {
    if(this.meal.instructions[index]=='#'){
       this.Instructions.push(x)
       x=""
    }
   else
      x+=this.meal.instructions[index]  
  }    
  console.log(this.Instructions)
}

GetLevel(){
  this.serl.GetAllLevels().subscribe(succ => { 
    succ.forEach(element => {
      if(element.levelCode==this.meal.levelCode)
        this.level= element.levelName;
    });
   }, err => {
     console.log(err)
   })
}
GetCategory(){
  this.serc.GetAllCategories().subscribe(succ => { 
    succ.forEach(element => {
      if(element.mealCategoriesCode==this.meal.mealCategoryCode)
        this.category= element.mealCategoriesName;
    });
   }, err => {
     console.log(err)
   })
}
UnitMeasures:string[]=[]
GetAllUnitMeasures(){
  this.seru.GetAllUnitMeasures().subscribe(succ=>{
    console.log(succ)
    console.log(this.meal.products)
    this.meal.products.forEach(element => {
      for (let index = 0; index < succ.length; index++) {
        if(element.unitMeasureCode==succ[index].unitCode){
           let x=""
            if(element.amountInMeal>1){
             switch (succ[index].unitName) {        
              case "יחידה":x="יחידות";break;
              case "כף":x="כפות";break;                                 
              case "כפית":x="כפיות";break;
              case "ליטר":x="ליטרים";break;
              case "כוס":x="כוסות";break;
              default:x=succ[index].unitName;break;
            }
             this.UnitMeasures.push(x)       
            }      
            else{this.UnitMeasures.push(succ[index].unitName)}                         
              
        }         
      }
    }); 
  }),err=>{console.log(err)}       

}

GetMeasure(x:Product){
  let p:Product=new Product(x.productCode,x.productName,x.amount,x.amount,x.unitMeasureCode,x.company,x.mealCode)
 console.log(p)
  this.UnitMeasures.forEach(element => {
 
});

}


url;
GetPicture(x:number){
  this.serp.GetPictureById(x).subscribe(succ=>{
    this.url=succ.pictureName
    console.log(this.url)
 },err=>{
   console.log(err)
 })
}
 download(){
   this.meal.numberOfDiners=this.count
  const dialogRef = this.dialog.open(DownloadComponent, {
    data: this.meal,
    height:'100%',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });

  // const dialogRef = this.dialog.open(ChangePeopleComponent, {
  //   data: this.meal
  // });
  // dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  // });
 }

 print(){
   window.print()
 }

 
plus(){
this.count++
this.meal.products.forEach(element => {
  element.amountInMeal=element.amount*this.count;
});
}
minus(){
  if(this.count!=1){
    this.count--
    this.meal.products.forEach(element => {
      element.amountInMeal=element.amount*this.count;
    });
  }
}





sendMeal(){
  console.log(this.Namefrom)
  console.log(this.from)
  console.log(this.to)
  console.log(this.message)
  console.log(this.meal)
  this.ser.SendMealInMail(this.Namefrom,this.from,this.to,this.message,this.meal).subscribe(succ=>{},err=>{console.log(err)})
}



}
