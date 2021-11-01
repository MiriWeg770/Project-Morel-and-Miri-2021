import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meal } from 'src/Models/Meal';
import { User } from 'src/Models/User';
import { ChangePeopleComponent } from '../change-people/change-people.component';
import { MealService } from '../meal.service';
import { UserService } from '../user.service';
import { DownloadComponent } from '../download/download.component';
import { ShowMealDetailsComponent } from '../show-meal-details/show-meal-details.component';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { Picture } from 'src/Models/Picture';
import { PictureService } from '../picture.service';
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  // meal:Meal=new Meal(1,"סלט", "ddd",12,"dd",1,11,12,null,"morel",new Date("2000-12-12"))
  u:User; 
   
  @Input() meal:Meal;

 name:string
  constructor(private ser:MealService,private dialog:MatDialog,private serp:PictureService,private _snackBar: MatSnackBar) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    // this.getUserName(this.meal.mealCode)  
  }

  ngOnInit(): void {
  }

  add(){
    if(this.u!=null){
    let m:Meal=new Meal(0,this.meal.mealName,this.meal.instructions,this.meal.numberOfDiners,this.meal.discription,this.meal.mealCategoryCode,this.u.userCode,null,this.meal.preparationTime,null,new Date(),this.meal.pictureCode, false,null,this.meal.menuCode,this.u.userName,this.meal.products,this.meal.levelCode)
    console.log(this.meal)
    this.ser.AddMealToUser(m).subscribe(succ=>{
      console.log(succ)
      this._snackBar.open("המנה התווספה ", "סגור",{
        horizontalPosition: 'center',
        verticalPosition:'top' 
        });
    },err=>{
      console.log(err)
    })
  }
  else{
      const dialogRef = this.dialog.open(MakeAccountComponent, {  
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');      
    });
  
}}
url="../../assets/help.png";
GetPicture(x:number){
  this.serp.GetPictureById(x).subscribe(succ=>{
    this.url=succ.pictureName
    console.log(this.url)
 },err=>{
   console.log(err)
 })
}


download(){

  const dialogRef1 = this.dialog.open(ChangePeopleComponent, {
    data: this.meal,
    // height:'100%',
    // panelClass:'my-dialog'
  });
  dialogRef1.afterClosed().subscribe(result => {
    if(result){
      this.meal.numberOfDiners=result
    } 
  //   const dialogRef2 = this.dialog.open(DownloadComponent, {
  //   data: this.meal,
  //   height:'100%',
  //   // panelClass:'my-dialog'
  // });
  // dialogRef2.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  // });
  });

 
 }



DateUplaod(){
  let d:Date= new Date( this.meal.dateUplaod)
  return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
}


count(){
  this.meal.numberOfViews=this.meal.numberOfViews+1;
  this.ser.UpdateMeal(this.meal).subscribe(succ=>{
  console.log(succ.numberOfViews)
  },err=>{console.log(err)})
}
  }
