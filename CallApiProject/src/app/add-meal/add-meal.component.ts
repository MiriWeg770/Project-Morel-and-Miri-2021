import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import {FormControl} from '@angular/forms';
import { Meal } from 'src/Models/Meal';
import { MealService } from '../meal.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from 'src/Models/Product';
import { Subscriber } from 'rxjs';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
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

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {

  u: User
  ELEMENT_DATA: Product[] = [];
  newMeal: Meal = new Meal(0, null, null, null,null,null,null,0,null,new Date(),new Date(),null,false,null,null,null,null,null);
  // newProduct: Product = new Product(0, null, null, null, null,null);
  categories: MealCategories[];
  levels:Level[]
  selectCa:string
  selectLe:string
  newMealCategories: CategoriesToMeal = new CategoriesToMeal(0, 0, 0);
  Instructions:String[]=[]
  imageUrl: string="/assets/img/1.png"
  fileToUpload:File=null
  UnitMeasures:UnitMeasure[]=[]
  picture:Picture=new Picture(1,"",1);
  // hour:number;
  // minute:number

  content1:boolean=true;
  content2:boolean;
  content3:boolean;
  content4:boolean;
empty=false;
  constructor(private ser: MealService, private serc: MealCategoriesService,private serl:LevelService,private seru:UnitMeasureService,private serp:PictureService, public dialog: MatDialog, public active: ActivatedRoute,
    public dialogRef: MatDialogRef<AddMealComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal) {
    this.u = JSON.parse(localStorage.getItem("user"));
    this.newMeal.userCode = this.u.userCode;
    
    if (data != null) {
      this.newMeal = data
      serc.GetCategoryById(this.newMeal.mealCategoryCode).subscribe(succ => {
        this.selectCa = succ.mealCategoriesName
        console.log(this.selectCa)
      }, err => {
        console.log(err)
      })
      serl.GetLevelById(this.newMeal.levelCode).subscribe(succ => {
        this.selectLe = succ.levelName
        console.log(this.selectLe)
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
         console.log(succ)
          this.url=succ.pictureName
      },err=>{console.log(err)})
      let x:string=""
      for (let index = 0; index < this.newMeal.instructions.length; index++) {
        if(this.newMeal.instructions[index]=='#'){
           this.Instructions.push(x)
           x=""
        }
       else
          x+=this.newMeal.instructions[index]  
      }    
      console.log(this.Instructions)
    }
    this.AddProduct()
    this.AddStep()
    
  }
  ngOnInit(): void {
    this.GetCategories()
    this.GetLevels()
    this.GetAllUnitMeasures()
  }
time:Date=new Date()
  saveMeal() {
    console.log(this.selectCa)

    this.ELEMENT_DATA.forEach(element => {
      element.unitMeasureCode=Number(element.unitMeasureCode)
    });   
    this.newMeal.products = this.ELEMENT_DATA;
    
    // this.categories.forEach(element => {
    //   if (element.mealCategoriesName == this.selectCa)
    //     this.newMealCategories.mealCategoriesCode = element.mealCategoriesCode
    // });
    this.categories.forEach(element => {
      if (element.mealCategoriesName == this.selectCa)
        this.newMeal.mealCategoryCode = element.mealCategoriesCode
    });
    this.levels.forEach(element => {
      if (element.levelName == this.selectLe)
        this.newMeal.levelCode = element.levelCode
    });
    console.log(this.selectLe)
    console.log(this.newMeal.products);

    let s:string=""
    this.Instructions.forEach(element => {
      if(element!=" ")
       s+=element+"#"
   });
   console.log(this.Instructions)

   this.newMeal.instructions=s
   console.log(this.newMeal)
    this.picture.pictureName=this.url;
    // this.time.setHours(this.hour,this.minute)
    // this.newMeal.preparationTime= this.time;

   this.serp.AddPicture(this.picture).subscribe(succ=>{
     console.log(succ)
     this.newMeal.pictureCode=succ.pictureCode;
     
     let x=this.newMeal;
     if(x.mealName!=null && x.numberOfDiners!=null && x.pictureCode!=null && x.products!=[] 
       && x.preparationTime!=null && x.instructions!=null && x.levelCode!=null && x.mealCategoryCode!=null
       && x.discription!=null
      ){
     this.ser.AddMealToUser(this.newMeal).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
    })  }
    else{
      alert("מלא את כל הפרטים")
      this.empty=true
    }
    },err=>{console.log(err)})

  }
  updateMeal() {
    this.ELEMENT_DATA.forEach(element => {
      element.unitMeasureCode=Number(element.unitMeasureCode)
    });   
    this.newMeal.products = this.ELEMENT_DATA
    this.newMeal.dateUpdated=new Date()
    console.log(this.newMeal)

    this.categories.forEach(element => {
      if (element.mealCategoriesName == this.selectCa)
        this.newMeal.mealCategoryCode = element.mealCategoriesCode
    });
    this.levels.forEach(element => {
      if (element.levelName == this.selectLe)
        this.newMeal.levelCode = element.levelCode
    });
    let s:string=""
    console.log(this.Instructions)
    this.Instructions.forEach(element => {
      if(element!=""){
        s+=element+"#"
        console.log(s)
      }
   });
   this.picture.pictureName=this.url;
   this.serp.AddPicture(this.picture).subscribe((succ:Picture)=>{
     console.log(succ)
     this.newMeal.pictureCode=succ.pictureCode;
     this.ser.UpdateMeal(this.newMeal).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
    })  
    },err=>{console.log(err)})
   this.newMeal.instructions=s
   console.log(this.Instructions)
   

  }

  // addProduct() {
  //   console.log(this.newProduct)
  //   this.ELEMENT_DATA.push(this.newProduct)
  //   this.newProduct = new Product(null, null, null, null, null,null)
  // }


  GetLevels() {
    this.serl.GetAllLevels().subscribe(succ => {
      this.levels = succ
      console.log(succ)
    }, err => {
      console.log(err)
    })
  }

  GetCategories() {
    this.serc.GetAllCategories().subscribe(succ => {
      this.categories = succ
      console.log(succ)
    }, err => {
      console.log(err)
    })
  }
  GetAllUnitMeasures(){
    this.seru.GetAllUnitMeasures().subscribe(succ=>{
      console.log(succ)
      this.UnitMeasures=succ
    }),err=>{console.log(err)}
  }

  url;
  name;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files[0].name);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(this.url);
        
      }
    }
  }
  // handlerFileInput(file:FileList){
  //   this.fileToUpload=file.item(0)
  //       var reader= new FileReader();
  //       reader.onload=(event:any)=>{
  //         this.imageUrl= event.target.result;
  //       }
  //       reader.readAsDataURL(this.fileToUpload);
  //   }

    
    AddStep(){
      this.Instructions.push("")
      console.log(this.Instructions)
    }
    RemoveStep(x:string){
      if(this.Instructions.includes(x))  
      this.Instructions.splice(this.Instructions.indexOf(x), 1);
      console.log(this.Instructions)
    }   
    // c(x:string,i:number){
    //   this.Instructions[i]=x
    //   console.log(this.Instructions)
    // }

    AddProduct(){
      let p:Product=new Product(1,null,null,null,"null",null)
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
    
}
