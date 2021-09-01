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
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  // meal:Meal=new Meal(1,"סלט", "ddd",12,"dd",1,11,12,null,"morel",new Date("2000-12-12"))
  u:User; 
   
  @Input() meal:Meal;
  
  // code:number;

 name:string
  constructor(private ser:MealService,private userSer:UserService,private dialog:MatDialog,private _snackBar: MatSnackBar) { 
    this.u= JSON.parse(localStorage.getItem("user"));
    // this.getUserName(this.meal.mealCode)
  }

  ngOnInit(): void {
  }

  add(){
    if(this.u!=null){
    this.meal.userCode=this.u.userCode
    this.ser.AddMealToUser(this.meal).subscribe(succ=>{
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
    console.log("error")
    alert("התחבר/ הירשם")
  }
}

// getUserName(x:number){
//   this.userSer.GetUserById(x).subscribe(succ=>{
//     this.name=succ.userName
//     console.log(this.name)
//  },err=>{
//    console.log(err)
//  })
// }


download(){
  // let download = new DownloadComponent(this.meal);

  const dialogRef = this.dialog.open(ChangePeopleComponent, {
    data: this.meal
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}


// open(){
//   const dialogRef = this.dialog.open(ShowMealDetailsComponent, {
//     data: this.meal,
//     width:'1000px',
//     height:'100%',
//     panelClass: 'my-dialog'
//   });
//   dialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//   });
// }
  }
