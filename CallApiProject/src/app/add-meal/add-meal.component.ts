import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import {FormControl} from '@angular/forms';
import { Meal } from 'src/Models/Meal';
import { MealService } from '../meal.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/Models/Product';
import { Subscriber } from 'rxjs';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/Models/User';
import { MealCategoriesService } from '../meal-categories.service';
import { MealCategories } from 'src/Models/MealCategories';
import { CategoriesToMeal } from 'src/Models/CategoriesToMeal';
// import { time } from 'console';
import { color } from 'html2canvas/dist/types/css/types/color';
import { Level } from 'src/Models/Level';
import { LevelService } from '../level.service';
import { UnitMeasure } from 'src/Models/UnitMeasure';
import { UnitMeasureService } from '../unit-measure.service';
import { Picture } from 'src/Models/Picture';
import { PictureService } from '../picture.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {

  u: User
  ELEMENT_DATA: Product[] = [];
  newMeal: Meal = new Meal(0, null, null, null,null,null,null,0,null,null,new Date(),null,false,null,null,null,null,null);
  categories: MealCategories[];
  levels:Level[]
  selectCa:string=''
  selectLe:string=''
  newMealCategories: CategoriesToMeal = new CategoriesToMeal(0, 0, 0);
  imageUrl:Picture;
  fileToUpload:File=null
  UnitMeasures:UnitMeasure[]=[]
  picture:Picture=new Picture(1,"",1);
  hour:number=null
  minute:number=null
  hours:number[]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  minutes:number[]=[0,5,10,15,20,25,30,35,40,45,50,55]
  content1:boolean=true;
  content2:boolean;
  content3:boolean;
  content4:boolean;
  empty=false;
  url=null;
  Instructions = [];
  name:Meal;
  loader=false
  edit=false
  options:string[]=[]
  op:string[]=[]

  constructor(private ser: MealService, private serc: MealCategoriesService,private serl:LevelService,private seru:UnitMeasureService,private serp:PictureService, public dialog: MatDialog, public active: ActivatedRoute,
    public dialogRef: MatDialogRef<AddMealComponent>,@Inject(MAT_DIALOG_DATA) public data: Meal, private _snackBar: MatSnackBar) {
    this.u = JSON.parse(localStorage.getItem("user"));
    this.newMeal.userCode = this.u.userCode;  
    
    if (data!= null) {
      this.edit=true
      this.newMeal = data
      this.serl.GetLevelById(this.newMeal.levelCode).subscribe(succ => {
        this.selectLe = succ.levelName
      }, err => {
        console.log(err)
      })
      serc.GetCategoryById(this.newMeal.mealCategoryCode).subscribe(succ => {
        this.selectCa = succ.mealCategoriesName
      }, err => {
        console.log(err)
      })
     
      ser.GetProductsMeal(this.newMeal.mealCode).subscribe(succ => {
        console.log(succ)
        this.ELEMENT_DATA = succ
      }, err => {
        console.log(err)
      })  
      serp.GetPictureById(this.newMeal.pictureCode).subscribe(succ=>{
          this.url=succ.pictureName
          this.imageUrl=succ
      },err=>{console.log(err)})
      let x:string=""
      for (let index = 0; index < this.newMeal.instructions.length; index++) {
        if(this.newMeal.instructions[index]=='#'){
          this.Instructions.push({ key: x.toString() });
           x=""
        }
       else
          x+=this.newMeal.instructions[index]  
      }    
      let time:Date=new Date(this.newMeal.preparationTime)
      console.log(time)
      this.hour=time.getHours()
      this.minute=time.getMinutes()
    }
    this.AddProduct()    
  }
  ngOnInit(): void {
    this.GetAllProducts()
    this.GetCategories()
    this.GetLevels()
    this.GetAllUnitMeasures()
  } 

  
  
  interval
  openMessage(y:number){
    if(y==1)
    document.getElementById("dialog").style.display="block"
    else if(y==2)
    document.getElementById("dialog2").style.display="block"
    else if(y==3)
    document.getElementById("dialog3").style.display="block"

    let x=0
     this.interval = setInterval(() => {
    x++
    if(x==2){
    this.closeMessage()
     if(y==1){
            this.dialogRef.close()
            this.closeMessage()
     }
    }
    console.log(x)
    },1000)
  }
  closeMessage(){
    clearInterval(this.interval)
    document.getElementById("dialog").style.display="none"
    document.getElementById("dialog2").style.display="none"
    document.getElementById("dialog3").style.display="none"
  }
  details(){
    this.loader=true
    this.newMeal.preparationTime= new Date()
    this.newMeal.preparationTime.setHours(this.hour)
    this.newMeal.preparationTime.setMinutes(this.minute)
    this.ELEMENT_DATA.forEach(element => {
      element.unitMeasureCode=Number(element.unitMeasureCode)
    });   
    this.newMeal.products = this.ELEMENT_DATA;
    this.categories.forEach(element => {
      if (element.mealCategoriesName == this.selectCa)
        this.newMeal.mealCategoryCode = element.mealCategoriesCode
    });
    this.levels.forEach(element => {
      if (element.levelName == this.selectLe)
        this.newMeal.levelCode = element.levelCode
    });
    let s:string=""
    this.Instructions.forEach(element => {
      if(element.key!=" ")
       s+=element.key+"#"
    });
    this.newMeal.instructions=s
    this.picture.pictureName=this.url;
  }
  saveMeal() {  
    this.details()
    let x=this.newMeal;
    if(x.mealName!=null && x.numberOfDiners!=null && this.picture.pictureName!=null && x.products!=[] 
      && x.preparationTime!=null && x.instructions!=null && x.levelCode!=null && x.mealCategoryCode!=null
      && x.discription!=null
     ){
       this.ser.checkMealName(x).subscribe(succ=>{
       this.name=succ
      if(this.name==null)
      {
       this.serp.AddPicture(this.picture).subscribe(succ=>{
       this.newMeal.pictureCode=succ.pictureCode;
       this.ser.AddMealToUser(this.newMeal).subscribe(succ => {
       console.log(succ);
       this.loader=false
       this.openMessage(1)
      //  this._snackBar.open(" המנה התווספה בהצלחה!! ", "אישור",{
      //   horizontalPosition: 'center',
      //   verticalPosition:'top' 
      //   });
      }, err => { console.log(err)})  
     },err=>{console.log(err)})
      }
      else{
        this.loader=false
        console.log("err")
        this.openMessage(3)
        // this._snackBar.open("יש לך כבר מנה בשם זה,שנה שם", "אישור!",{
        //   horizontalPosition: 'center',
        //   verticalPosition:'top' 
        //   });
      }
    },err=>{console.log(err)}) 
    }  
    else{
      console.log("err")
      this.openMessage(2)
      this.loader=false
      this.empty=true
      // this._snackBar.open(" מלא את כל הפרטים", "אישור",{
      //   horizontalPosition: 'center',
      //   verticalPosition:'top' 
      //   });
    }
  }
  updateMeal() {
    this.details()
    this.newMeal.dateUpdated=new Date()
    let x=this.newMeal;
    if(x.mealName!=null && x.numberOfDiners!=null && this.picture.pictureName!=null && x.products!=[] 
      && x.preparationTime!=null && x.instructions!=null && x.levelCode!=null && x.mealCategoryCode!=null
      && x.discription!=null
     ){
      this.ser.checkMealName(x).subscribe(succ=>{
        this.name=succ
       if(this.name==null)
       {
        this.serp.AddPicture(this.picture).subscribe(succ=>{
       this.newMeal.pictureCode=succ.pictureCode;
       this.ser.UpdateMeal(this.newMeal).subscribe(succ => {
       console.log(succ);
       this.loader=false
       this.openMessage(1)
      }, err => { console.log(err)})  
     },err=>{console.log(err)})
    }
    else{
      this.loader=false
        console.log("err")
        this.openMessage(3)
    }
  },err=>{console.log(err)}) 
    }  
    else{
      console.log("err")
      this.openMessage(2)
      this.loader=false
      this.empty=true
    }
  }
  GetAllProducts(){
    this.ser.GetAllUsersMealsProducts().subscribe(succ=>{
      succ.forEach(element => {
        this.op.push(element.productName);
      });      
      var mySet = new Set(this.op);
       this.op = [...mySet];
       console.log(this.op);
    });
  }
  GetLevels() {
    this.serl.GetAllLevels().subscribe(succ => {
      this.levels = succ

    }, err => {
      console.log(err)
    })
  }
  GetCategories() {
    this.serc.GetAllCategories().subscribe(succ => {
      this.categories = succ
      // if(this.data!=null)
      //   this.c()
    }, err => {
      console.log(err)
    })
  }
  GetAllUnitMeasures(){
    this.seru.GetAllUnitMeasures().subscribe(succ=>{
      this.UnitMeasures=succ
    }),err=>{console.log(err)}
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      console.log(event.target.files[0].name);
      reader.onload = (event) => {
        this.url = event.target.result;
        console.log(this.url);    
      }
    }
  }
  AddProduct(){
      let p:Product=new Product(1,null,null,null,null)
      this.ELEMENT_DATA.push(p)   
      console.log(this.ELEMENT_DATA)
 }
  RemoveProduct(x:Product){
      if(this.ELEMENT_DATA.includes(x))  
      this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(x), 1);
      console.log(this.ELEMENT_DATA)
  }
  check(x:number){
  switch (x) {
  case 1:this.content1=true;this.content2=false;this.content3=false;this.content4=false;break;
  case 2:this.content1=false;this.content2=true;this.content3=false;this.content4=false;break;
  case 3:this.content1=false;this.content2=false;this.content3=true;this.content4=false;break;
  case 4:this.content1=false;this.content2=false;this.content3=false;this.content4=true;break;
  default:console.log("err");break;
}
  }
 addField() {
  this.Instructions.push({ key: "" });
 }
 removeField(index: number) {   
  this.Instructions.splice(index, 1); 
 }
 trackByFn(i: number) {
  return i;
 }
 Options(x:string){
  this.options=[]
  if(x!=""){
  this.op.forEach(element => {
   if(element!=null && element.includes(x)){
     this.options.push(element)
   }
 });
}

 }



 
}
