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
import { MealService } from '../meal.service';
import { UserService } from '../user.service';
// import * as jsPDF from 'jspdf'
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
  meal:Meal=new Meal(null,null,null,null,null,null,null,null,null,null,null);
  // meal: Meal= new Meal(1,"סלט","bfbtr",12,"סלט איטלקי מלא במליחות ים תיכונית. שמן הזית, הלימון והבלסמי יוצרים תחמיץ נפלא, שעובד גם עם ברוקולי",1,11,1,this.prosucts,"נועה",new Date("2000-08-02"));
 
  bgVariable:Boolean=false
  headerVariable:boolean=false


  u:User;
  constructor(private router:ActivatedRoute,private ser:MealService,private serUser:UserService, private _snackBar: MatSnackBar,private dialog:MatDialog) { 
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

 


}
