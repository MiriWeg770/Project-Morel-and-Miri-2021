import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Meal } from 'src/Models/Meal';
import { Product } from 'src/Models/Product';
import { User } from 'src/Models/User';
import { ChangePeopleComponent } from '../change-people/change-people.component';
import { DownloadComponent } from '../download/download.component';
import { LevelService } from '../level.service';
import { MealCategoriesService } from '../meal-categories.service';
import { MealService } from '../meal.service';
import { UserService } from '../user.service';
// import * as jsPDF from 'jspdf'
@Component({
  selector: 'app-show-meal-details',
  templateUrl: './show-meal-details.component.html',
  styleUrls: ['./show-meal-details.component.css']
})
export class ShowMealDetailsComponent implements OnInit {

  meal:Meal=new Meal(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
 
  // bgVariable:Boolean=false
  // headerVariable:boolean=false

  Instructions:string[]=[]
  more:Meal[]=[]
  u:User;
  count:number=0;
  category:string="";
  level:string="";
  products:Product[]=[]
  constructor(private router:ActivatedRoute,private ser:MealService,private serc:MealCategoriesService,private serl:LevelService,private serUser:UserService, private _snackBar: MatSnackBar,private dialog:MatDialog) { 
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
   let d:Date=new Date()
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

 download(){
  //  console.log("download")
  //  const doc=new jsPDF();

  //  let data= document.getElementById("recipy")


  //   html2canvas(data).then(canvas=>{
  //   let imgWidth=290;
  //   let imgHeight=(canvas.height * imgWidth / canvas.width)
  //   const contentDataUrl = canvas.toDataURL('image/png')
  //   let pdf =  new jsPDF('l','mm','a4')
  //   var position = 10;
  //   pdf.addImage(contentDataUrl,'PNG',0,position,imgWidth,imgHeight);
  //   pdf.save(this.meal.mealName +" מתכון")
  // })

  const dialogRef = this.dialog.open(ChangePeopleComponent, {
    data: this.meal
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
 }

 print(){
   window.print()
 }

 
plus(){
this.count++
}
minus(){
  if(this.count!=1)
    this.count--
}

}
