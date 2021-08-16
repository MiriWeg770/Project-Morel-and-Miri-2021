import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Product } from 'src/Models/Product';
import { MealService } from '../meal.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-meal-details',
  templateUrl: './show-meal-details.component.html',
  styleUrls: ['./show-meal-details.component.css']
})
export class ShowMealDetailsComponent implements OnInit {
  prosucts:Product[]=[
    new Product(null,"חסה",12,"גרם",null),
    new Product(null,"חסה",12,"גרם",null),
    new Product(null,"חסה",12,"גרם",null),
    new Product(null,"חסה",12,"גרם",null),
    new Product(null,"חסה",12,"גרם",null),
  ]
  meal: Meal= new Meal(1,"סלט","bfbtr",12,"סלט איטלקי מלא במליחות ים תיכונית. שמן הזית, הלימון והבלסמי יוצרים תחמיץ נפלא, שעובד גם עם ברוקולי",1,11,1,null,null);
 
  bgVariable:Boolean=false
  headerVariable:boolean=false
  constructor(private router:ActivatedRoute,private ser:MealService,private _snackBar: MatSnackBar) { 
  //   this.router.params.subscribe(parameters => {
  //     let code = +parameters["id"];
  //     console.log(code);
  //    this.ser.GetMealById(code).subscribe(dataList => this.meal = dataList);

  // })
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
 Date(d:Date){
   return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
 }
 
 addMeal(){
   this.ser.AddMeal(this.meal).subscribe(succ=>{
     console.log(succ)   
     this._snackBar.open("המנה התווספה ", "סגור",{
      horizontalPosition: 'center',
      verticalPosition:'top' 
      });

   },err=>{
     console.log(err)
   })
 }
}
