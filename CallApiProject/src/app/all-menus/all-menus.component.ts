import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/Models/Menu';
import { MenuCategories } from 'src/Models/MenuCategories';
import { MenuService } from '../menu.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-all-menus',
  templateUrl: './all-menus.component.html',
  styleUrls: ['./all-menus.component.css']
})
export class AllMenusComponent implements OnInit {

listMenus:Menu[]=[]
sortBy:string[]=["ללא מיון","פופולרי","לפי תאריך עולה","לפי תאריך יורד"]
listCategories:MenuCategories[]=[]
notFound=false
choose=false
menus:Menu[]=[]
checkList:MenuCategories[]=[]
text:string=""
find:Menu[]=[]
arr:Menu[]=[]
s:string=this.sortBy[0]

  constructor(private ser:MenuService,private serU:UserService) { 
    this.GetAllMenus()
    this.GetAllCategories()
  }
  ngOnInit(): void {
    // window.addEventListener("scroll",this.scrollFunction) 
  }
  goToTop(){
    window.scrollTo(0,0)
   }
   scrollFunction() {
    if (window.scrollY>100) {
      document.getElementById("back-to-top").style.display = "block";
    } else {
      document.getElementById("back-to-top").style.display = "none";
    }
  }
  GetAllMenus(){
    this.ser.GetAllMenus().subscribe(succ=> {
      this.listMenus=succ
      this.arr=this.listMenus
      this.listMenus.forEach(element => {
       this.serU.GetUserById(element.userCode).subscribe(succ=>{
         element.userName=succ.userName
       },err=>{
         console.log(err)
       })
       this.ser.GetMenuMeals(element.menuCode).subscribe(succ=>{
        element.meals=succ
       },err=>{console.log(err)});
     });
   },err=>{
     console.log(err)
   })
   
  }
  GetAllCategories(){
    this.ser.GetAllCategories().subscribe(succ=>{
    this.listCategories=succ
    },err=>{console.log(err)})
  }
  GetMenusByCategory(x:MenuCategories){
    let count=0
   this.listMenus.forEach(element => {
     if(element.menuCategoryCode==x.menuCategoriesCode)
      count++;
   });
   return count;
  }  
  sortByCategory(x:number){   
   this.listMenus.forEach(element => {
     if(element.menuCategoryCode==x)
      this.menus.push(element)
   });
   this.choose=true
   this.arr=this.menus 
    console.log(this.arr.length)
  }
  check(x:MenuCategories){
    if(!this.checkList.includes(x)){this.checkList.push(x)}
    else{this.checkList.splice(this.checkList.indexOf(x),1)} 
    this.menus=[]
    if(this.checkList.length==0)
        this.arr=this.listMenus
    this.checkList.forEach(element => {
         this.sortByCategory(element.menuCategoriesCode)
    });
    this.choose=this.checkList.length!=0?true:false;
  }
  search(){
   if(this.text==""){
     this.menus=this.arr
     this.notFound=false
   }
   else{
     console.log(this.text)
     this.find.length=0;
     this.arr.forEach(element => {
     if(element.menuName.includes(this.text)){ 
         this.find.push(element);  
      }
      });
      if(this.find.length==0)
         this.notFound=true
         this.menus=this.find
         this.choose=true
   }
 }
  sort(){
    console.log(this.s)
   if(this.s==this.sortBy[0]){
     this.GetAllMenus()
   } 
   if(this.s==this.sortBy[1]){
     console.log(this.sortBy[1])
     let swapped = true;
     while(swapped)
     {
     swapped = false;
     for (let index = 0; index < this.listMenus.length-1; index++) {
       if (this.listMenus[index].viewsNumber < this.listMenus[index+ 1].viewsNumber)
        {
             let t = this.listMenus[index];
             this.listMenus[index] = this.listMenus[index + 1];
             this.listMenus[index + 1] = t;
             swapped = true;
        }
       }
     }
   }
   if(this.s==this.sortBy[2]){
     console.log(this.sortBy[1])
     let swapped = true;
     while(swapped)
     {
     swapped = false;
     for (let index = 0; index < this.listMenus.length-1; index++) {
       if (this.listMenus[index].dateUpload < this.listMenus[index+ 1].dateUpload)
        {
             let t = this.listMenus[index];
             this.listMenus[index] = this.listMenus[index + 1];
             this.listMenus[index + 1] = t;
             swapped = true;
        }
       }
     }
   }
   if(this.s==this.sortBy[3]){
     console.log(this.sortBy[1])
     let swapped = true;
     while(swapped)
     {
     swapped = false;
     for (let index = 0; index < this.listMenus.length-1; index++) {
       if (this.listMenus[index].dateUpload > this.listMenus[index+ 1].dateUpload)
        {
             let t = this.listMenus[index];
             this.listMenus[index] = this.listMenus[index + 1];
             this.listMenus[index + 1] = t;
             swapped = true;
        }
       }
     }
   }
 }
 
}
