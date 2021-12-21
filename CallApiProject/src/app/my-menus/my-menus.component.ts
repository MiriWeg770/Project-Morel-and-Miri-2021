import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { Level } from 'src/Models/Level';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { MenuCategories } from 'src/Models/MenuCategories';
import { Picture } from 'src/Models/Picture';
import { User } from 'src/Models/User';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { DeletMealComponent } from '../delet-meal/delet-meal.component';
import { DeletMenuComponent } from '../delet-menu/delet-menu.component';
import { DeletPublishedMenuComponent } from '../delet-published-menu/delet-published-menu.component';
import { LevelService } from '../level.service';
// import { DeleteMenuComponent } from '../delete-menu/delete-menu.component';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';
import { PictureService } from '../picture.service';
import { RemoveShareToUpdateComponent } from '../remove-share-to-update/remove-share-to-update.component';
import { RemoveShareComponent } from '../remove-share/remove-share.component';
import { ShareMenuComponent } from '../share-menu/share-menu.component';
import { UserService } from '../user.service';


@Component({
  selector: 'app-my-menus',
  templateUrl: './my-menus.component.html',
  styleUrls: ['./my-menus.component.css']
})
export class MyMenusComponent implements OnInit {
    u: User = new User(null, null, null, null,null,null);
    choose = false
    add = false
    newMenu: Menu = new Menu(1,null,null,null,null,null,0,null,null,null,null,null,null,null);
    ELEMENT_DATA: Menu[] =[]
    click = false
    length = this.ELEMENT_DATA.length;
    levels:Level[]=[]
    checked:Menu[]=[]
    text:string=""
    find:Menu[]=[]
    c:MenuCategories[]=[]
    arr:Menu[]=[]
    loader=false
    constructor(private dialog:MatDialog,private ser:UserService,private serp:PictureService,private serl:LevelService,private _snackBar: MatSnackBar,private serm:MenuService) {
     this.u= JSON.parse(localStorage.getItem("user"));
     this.GetCategories()
     this.GetAllMenus()
     this.GetLevels()   
     this.GetPictures()
     }
  
    ngOnInit(): void {
    }
  
    pictures:Picture[]=[]
    GetMenuMeals(){
      this.ELEMENT_DATA.forEach(element => {
        this.serm.GetMenuMeals(element.menuCode).subscribe(succ => {
        element.meals= succ    
      }, err => {
        console.log(err)
      })
      }); 
    }
    GetAllMenus(){
      console.log(this.u.userCode)
      this.ser.GetUserMenus(this.u.userCode).subscribe(succ => {
       this.ELEMENT_DATA = succ;
       this.arr=succ
       this.GetPictures()
      this.GetMenuMeals()    
         console.log(this.ELEMENT_DATA);
     }, err => {
        console.log(err);
      }) 
   }
  //  GetMenuPictures(x:Menu){
  //    this.pictures=[]
  //    x.meals.forEach(element => {    
  //     this.serp.GetPictureById(x.pictureCode).subscribe(succ=>{
  //     this.pictures.push(succ)
  //     console.log(this.pictures)
  //     },err=>{console.log(err)})
  //  });
  //  }
   AddMenu(){
     const dialogRef = this.dialog.open(AddMenuComponent, {
     disableClose:true,
     autoFocus:false,
     height:'100%',
     width:'100%',
     panelClass:'my-dialog'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');    
         this.GetAllMenus()
    });  
  
   }
   UpdateMenu(x:Menu){
     if(!x.publish){
     const dialogRef = this.dialog.open(AddMenuComponent, {
     disableClose:true,
     autoFocus:false,
     data:x,
     height:'100%',
     width:'100%',
     panelClass:'my-dialog'
     });
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       this.GetAllMenus()
       console.log(result)
    });
   }
    else{
    const dialogRef = this.dialog.open(RemoveShareToUpdateComponent, {
      width: '20%',
      data:true
    });
   }
  }
   check(x:Menu){
     if(!this.checked.includes(x))
       this.checked.push(x) 
   console.log(this.checked)
   }
  DateCreated(x:Menu){
    let d:Date= new Date( x.dateCreated)
    return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  }
  DateUpdated(x:Menu){
    let d:Date= new Date( x.dateUpdated)
    if(x.dateUpdated!=null)
      return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
    else
      return ""
  }
  Delet(x:Menu,d=false) {
    console.log(x)
    let dialogRef;
    if(x.publish){
      dialogRef = this.dialog.open(DeletPublishedMenuComponent, {
      width: '20%',
    });
    }
    else{
       dialogRef = this.dialog.open(DeletMenuComponent, {
        width: '20%',
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
       this._snackBar.open(" נמחק  "+x.menuName, "סגור",{
          horizontalPosition: 'start',
          verticalPosition:'bottom' 
          });
        

      this.serm.DeleteMenu(x).subscribe(succ=>{
      console.log(succ)  
      this.GetAllMenus();
      },err => {
        console.log(err);
      }) }
    });
}
shareOne(x:Menu){
 x.publish=true,
 x.dateUpload=new Date()
 x.viewsNumber=0
 console.log(x)
 this.serm.PublishMenu(x).subscribe(succ=>{
   console.log("share")
   console.log(succ)
   const dialogRef = this.dialog.open(ShareMenuComponent, {
    data:x
   })
 },err=>{console.log(err)})
}
removeShare(x:Menu) {
  console.log(x)
  const dialogRef = this.dialog.open(RemoveShareComponent, {
    width: '20%',
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result){
    x.publish=false;
    this.serm.PublishMenu(x).subscribe(succ=>{
    console.log(succ)  
    this.GetAllMenus();
    },err => {
      console.log(err);
    }) }
  });
}
GetLevels(){
  this.serl.GetAllLevels().subscribe(succ => {
    this.levels=succ   
   }, err => {
     console.log(err)
   })
}
Level(x:Menu){
  let le:string;
  this.levels.forEach(element => {
    if(element.levelCode==x.levelCode)
      le= element.levelName;
  });
  return le;
}
search(){
  if(this.text==""){
    this.GetAllMenus()
  }
  else{
   console.log(this.text)
   this.find.length=0;
   this.ELEMENT_DATA=this.arr
   this.ELEMENT_DATA.forEach(element => {
   if(element.menuName.includes(this.text)){ 
   this.find.push(element);  
   }
  });
 this.ELEMENT_DATA=this.find

}}
GetCategories(){
  this.serm.GetAllCategories().subscribe(succ => {
    this.c=succ   
    console.log(this.c)      
   }, err => {
     console.log(err)
   })
}
Category(x:Menu){
  let ca:string;
  this.c.forEach(element => {
    if(element.menuCategoriesCode==x.menuCategoryCode)
      ca= element.menuCategoriesName;
  });
  return ca;
}
GetPictures(){
  this.ELEMENT_DATA.forEach(element => { 
  this.serp.GetPictureById(element.pictureCode).subscribe(succ=>{
    this.pictures.push(succ) 
  if(this.pictures.length==this.ELEMENT_DATA.length){
    console.log(this.pictures)
    this.GetAllMenus()
    this.loader=false
  }
},err=>{console.log(err)})
});
}
checkPic(x:number){
  let url;
 this.pictures.forEach(element => {
   if(element.pictureCode==x)
     url=element.pictureName
 });
 return url;
}
// GetPictures(){
//   this.pictures=[]
//   this.serp.GetAllPictures().subscribe(succ=>{
//     this.pictures=succ
//     console.log(this.pictures)
//     this.GetAllMenus()
//  },err=>{
//    console.log(err)
//  })
// }
// GetPicture(x:number){
//   let url;
//   this.pictures.forEach(element => {
//    if(element.pictureCode==x)
//       url= element.pictureName
//  });
//  return url
// }



menu:Menu
count
meals
products
UnitMeasures
category
time
level;

download(x:Menu){
  this.menu=x;

  document.getElementById("d").style.display="block";
  var data = document.getElementById('d')  
  html2canvas(data).then(canvas => {  
    var imgWidth = 208;   
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jspdf('p', 'mm', 'a4'); 
    pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight)  
    pdf.save(this.menu.menuName+" -תפריט");  
}); 
}


 }
