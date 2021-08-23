import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Product } from 'src/Models/Product';
import { User } from 'src/Models/User';
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
  meal:Meal=new Meal(null,null,null,null,null,null,null,null,null,null);
  // meal: Meal= new Meal(1,"סלט","bfbtr",12,"סלט איטלקי מלא במליחות ים תיכונית. שמן הזית, הלימון והבלסמי יוצרים תחמיץ נפלא, שעובד גם עם ברוקולי",1,11,1,this.prosucts,"נועה",new Date("2000-08-02"));
 
  bgVariable:Boolean=false
  headerVariable:boolean=false


  u:User;
  constructor(private router:ActivatedRoute,private ser:MealService,private serUser:UserService, private _snackBar: MatSnackBar) { 
    this.u=JSON.parse(localStorage.getItem("user"))
    this.router.params.subscribe(parameters => {
      let code = +parameters["id"];
       ser.GetAllMeals().subscribe(succ=>{
        this.meal =succ.find(p=>p.mealCode==code)
        console.log(this.meal)
        this.GetProducts(code)
        this.GetUser(this.meal.userCode)

        
      })
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
   return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear();
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
   console.log(code)
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
}
