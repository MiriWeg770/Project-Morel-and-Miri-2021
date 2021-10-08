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
import { time } from 'console';
import { color } from 'html2canvas/dist/types/css/types/color';
import { Level } from 'src/Models/Level';
import { LevelService } from '../level.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {

  u: User
  ELEMENT_DATA: Product[] = [];
  newMeal: Meal = new Meal(0, null, null, null,null,null,null,0,null,new Date(),new Date(),false,null,null,null,null,null);
  newProduct: Product = new Product(0, null, null, null, "null");
  categories: MealCategories[];
  levels:Level[]
  selectCa: string
  selectAm: string
  selectLe:string
  newMealCategories: CategoriesToMeal = new CategoriesToMeal(0, 0, 0);
  Instructions:string[]=[]
  imageUrl: string="/assets/img/1.png"
  fileToUpload:File=null

  
  constructor(private ser: MealService, private serc: MealCategoriesService,private serl:LevelService, public dialog: MatDialog, public active: ActivatedRoute,
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
  }
  ngOnInit(): void {
    this.GetCategories()
    this.GetLevels()
  }

  saveMeal() {
    console.log(this.selectCa)
    this.newMeal.products = this.ELEMENT_DATA;
    
    // this.categories.forEach(element => {
    //   if (element.mealCategoriesName == this.selectCa)
    //     this.newMealCategories.mealCategoriesCode = element.mealCategoriesCode
    // });
    // this.levels.forEach(element => {
    //   if (element.levelName == this.selectLe)
    //     this.newMealCategories.mealCategoriesCode = element.levelCode
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
    this.ser.AddMealToUser(this.newMeal).subscribe(data => {
      // this.newMealCategories.mealCode = data.mealCode;

      // this.ser.AddCategoriesToMeal(this.newMealCategories).subscribe();
      // console.log(data);
    }, err => {
      console.log(err);
    })

  }
  updateMeal() {
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
   this.newMeal.instructions=s
   console.log(this.Instructions)
    this.ser.UpdateMeal(this.newMeal).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
    })

  }

  addProduct() {
    this.newProduct.amountName = this.selectAm
    console.log(this.newProduct)
    this.ELEMENT_DATA.push(this.newProduct)
    this.newProduct = new Product(null, null, null, null, null)
  }

  

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
  

  handlerFileInput(file:FileList){
    this.fileToUpload=file.item(0)
        var reader= new FileReader();
        reader.onload=(event:any)=>{
          this.imageUrl= event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload);
    }


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
     let p:Product=new Product(1,null,null,null,"")
      this.ELEMENT_DATA.push(p)
      console.log(this.ELEMENT_DATA)
    }
    RemoveProduct(x:Product){
      if(this.ELEMENT_DATA.includes(x))  
      this.ELEMENT_DATA.splice(this.ELEMENT_DATA.indexOf(x), 1);
      console.log(this.ELEMENT_DATA)
    }

}
