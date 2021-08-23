import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
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

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  
 u:User 
 ELEMENT_DATA: Product[]=[];
 newMeal:Meal=new Meal(0,null,null,null,null,null,null,null,null,null);
 newProduct:Product=new Product(0,null,null,null,"null");
 categories:MealCategories[];
 selectCa:string
 selectAm:string



  constructor(private ser:MealService, private serc:MealCategoriesService, public dialog:MatDialog,public active: ActivatedRoute,
    public dialogRef: MatDialogRef<AddMealComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal) {   
      this.u= JSON.parse(localStorage.getItem("user"));
      this.newMeal.userCode = this.u.userCode;
      if(data!=null){
      this.newMeal=data
      serc.GetCategoryById(this.newMeal.mealCategoryCode).subscribe(succ=>{
        this.selectCa=succ.mealCategoriesName
        console.log(this.selectCa)
      },err=>{
        console.log(err)
      }) 
      ser.GetProductsMeal(this.newMeal.mealCode).subscribe(succ=>{
        console.log(succ)
        this.ELEMENT_DATA=succ
      },err=>{
        console.log(err)
      })
      console.log(this.newMeal)
  }
  }
  ngOnInit(): void {
    this.GetCategories()
  }

  saveMeal() {
    console.log(this.selectCa)
    this.newMeal.products=this.ELEMENT_DATA;
    this.categories.forEach(element => {
      if(element.mealCategoriesName==this.selectCa)
         this.newMeal.mealCategoryCode=element.mealCategoriesCode
    });
    console.log(this.newMeal.products);

    this.ser.AddMeal(this.newMeal).subscribe(succ => {
      console.log(succ.products);
    }, err => {
      console.log(err);
    })
  }
  updateMeal(){
    this.newMeal.products=this.ELEMENT_DATA
    console.log(this.newMeal.products)

    this.categories.forEach(element => {
      if(element.mealCategoriesName==this.selectCa)
         this.newMeal.mealCategoryCode=element.mealCategoriesCode
    });
    this.ser.UpdateMeal(this.newMeal).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
    })  
  }

  addProduct(){
    this.newProduct.amountName=this.selectAm
    console.log(this.newProduct)
    this.ELEMENT_DATA.push(this.newProduct)
    this.newProduct=new Product(null,null,null,null,null)
  }

  // addPro(){
  //   const dialogRef = this.dialog.open(AddProductComponent, {
  //     width: '30%',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.newProduct = result;
  //     this.ELEMENT_DATA.push(this.newProduct)
  //     console.log(this.ELEMENT_DATA)
    
  //   });
  // }
  // deletePro(){
  //   const dialogRef = this.dialog.open(DeleteProductComponent, {
  //     width: '30%',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if(result)
     
  //   console.log(this.ELEMENT_DATA) 
  //   });
  // }

  // addPro1(){
  //   const dialogConfig=new MatDialogConfig();
  //   dialogConfig.autoFocus=true;
  //   dialogConfig.width="30%";
  //   this.dialog.open(AddProductComponent,dialogConfig);
  //  }   
 
   GetCategories(){
     this.serc.GetAllCategories().subscribe(succ=>{
       this.categories=succ
       console.log(succ)
     },err=>{
       console.log(err)
     })
   }
  // editPro(){
  //  const dialogRef=this.dialog.open(EditProductComponent,{
  //    width:'500px',
  //    data:{
  //     ProductName:this.selectRow.ProductName,
  //     AmountName:this.selectRow.AmountName,
  //     Amount:this.selectRow.Amount,
  //     Company:this.selectRow.Company
  //    }
  //  });
   
  //  dialogRef.afterClosed().subscribe(result => {
  //   console.log('The dialog was closed');
  //   this.selectRow = result;
  // });
  // }
 
   
}
