import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { MenuService } from '../menu.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-menu-details',
  templateUrl: './show-menu-details.component.html',
  styleUrls: ['./show-menu-details.component.css']
})
export class ShowMenuDetailsComponent implements OnInit {
  u:User;
  menu:Menu=new Menu(null,null,null,null,null,null,null,null,null,null,null,null,null,null)
  listMeals:Meal[]=[
    // new Meal(1,"meal","j",12,"j",1,12,12,null,"k"),
    // new Meal(1,"meal","j",12,"j",1,12,12,null,"k",null),
    // new Meal(1,"meal","j",12,"j",1,12,12,null,"k",null),
   
  ] 
  count=0;
  constructor(private router:ActivatedRoute,private serm:MenuService,private seru:UserService,private _snackBar: MatSnackBar,private dialog:MatDialog) {
    this.u=JSON.parse(localStorage.getItem("user"))
    this.router.params.subscribe(parameters => {
      let code = +parameters["id"];
       serm.GetMenuById(code).subscribe(succ=>{
        this.menu =succ
        console.log(this.menu)         
        this.GetUser() 
        // this.GetMeals()    
      //   this.GetInstructions()  
      //   this.count=this.meal.numberOfDiners 
      //   this.GetCategory()
      //   this.GetLevel()
      },err=>{console.log(err)})
  
      });
   }

  ngOnInit(): void {
  }
 
  GetUser(){
    this.seru.GetUserById(this.menu.userCode).subscribe(succ=>{
      this.menu.userName=succ.userName
      this.GetMeals()
    },err=>{
      console.log(err)
    })
  }
  GetMeals(){
    this.serm.GetMenuMeals(this.menu.menuCode).subscribe(succ=>{
     this.listMeals=succ
     this.listMeals.forEach(element => {
       element.userName=this.menu.userName
     });
    },err=>{
      console.log(err)
    })
  }
  Date(){
    let d:Date=new Date(this.menu.dateUpload)
    return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  }
  addMenu(){
    if(this.u!=null){
    this.menu.userCode= this.u.userCode
    this.serm.AddMenuToUser(this.menu).subscribe(succ=>{
      console.log(succ)   
      this._snackBar.open("התפריט התווסף ", "סגור",{
       horizontalPosition: 'center',
       verticalPosition:'top' 
       });
 
    },err=>{
      console.log(err)
    })}
    else{
     const dialogRef = this.dialog.open(MakeAccountComponent, {  
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');      
 });   }
  }
  close(){
    document.getElementById("send").style.display="none";
  }
  open(){
   document.getElementById("send").style.display="block";
  }
  sendMenu(){
  //   console.log(this.Namefrom)
  //   console.log(this.from)
  //   console.log(this.to)
  //   console.log(this.message)
  //   console.log(this.meal)
  //   this.ser.SendMealInMail(this.Namefrom,this.from,this.to,this.message,this.meal).subscribe(succ=>{},err=>{console.log(err)})
  }
  plus(){
    this.count++
    }
    minus(){
      if(this.count!=1){
        this.count--
       
      }
    }
}
