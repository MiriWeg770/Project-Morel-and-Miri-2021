import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { Meal } from 'src/Models/Meal';
import { MealService } from '../meal.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from 'src/Models/Product';
import { Subscriber } from 'rxjs';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/Models/User';

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {
  selectedValue: string;
  selectedCar: string;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  cars: Car[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'}
  ];
  
 ELEMENT_DATA: Product[] = [
  new Product(1,"apple", 12,"gram","osem"),
  new Product(1,"apple", 12,"gram",null),
  ];
  displayedColumns: string[] = ['position', 'name', 'amount', 'amount_name','company','edit','delet'];
  // dataSource = ELEMENT_DATA;
  selectRow:Product;


  Ingredients=true;
  details=false;
  name
  u:User
 newMeal:Meal

  constructor(private ser:MealService,public dialog:MatDialog,public active: ActivatedRoute) {
    // this.active.params.subscribe(parameters => {
    //   this.name= +parameters["name"];
    // });
    this.u= JSON.parse(localStorage.getItem("user"));
    this.newMeal= new Meal(1,null,null,null,null,null,this.u.UserCode,null,null);
 
  }
  ngOnInit(): void {
  }

 showDetails(){
   this.details=true;
   this.Ingredients=false;
 }
 showIngredients(){
  this.details=false;
  this.Ingredients=true;
}



  toggle = true;




  enable() {
    this.toggle = !this.toggle;
  }
  saveMeal(){
      this.ser.AddMeal(this.newMeal).subscribe(succ => {
        console.log(this.newMeal);
      }, err => {
        console.log(err);
      })      
  }


 newProduct:Product;
  addPro(){
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '30%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newProduct = result;
      this.ELEMENT_DATA.push(this.newProduct)
      console.log(this.ELEMENT_DATA)
    
    });
  }
  deletePro(){
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '30%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result)
      // this.ELEMENT_DATA.splice(this.selectRow, 1);
     
    console.log(this.ELEMENT_DATA) 
    });
  }

  onRowClicked(event:Product){
    this.selectRow=event;
  }
  addPro1(){
    const dialogConfig=new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.width="30%";
    this.dialog.open(AddProductComponent,dialogConfig);
   }   
  // showdata;

  editPro(){
   const dialogRef=this.dialog.open(EditProductComponent,{
     width:'500px',
     data:{
      ProductName:this.selectRow.ProductName,
      AmountName:this.selectRow.AmountName,
      Amount:this.selectRow.Amount,
      Company:this.selectRow.Company
     }
   });
   
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.selectRow = result;
  });
  }
 
   
}
