import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { User } from 'src/Models/User';
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
  constructor(private router:ActivatedRoute,private serm:MenuService,private seru:UserService) {
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
  
}
