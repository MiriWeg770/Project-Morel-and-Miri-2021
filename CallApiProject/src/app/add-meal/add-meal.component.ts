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
import { EditProductComponent } from '../edit-product/edit-product.component';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {

  ELEMENT_DATA: Product[] = [
    new Product(1, "apple", 12, "gram", "osem"),
    new Product(1, "apple", 12, "gram", "osem"),
  ];

  u: User
  newMeal: Meal = new Meal(1, null, null, null, null, null, 0, null, this.ELEMENT_DATA, null);
  newProduct: Product = new Product(1, null, null, null, null);

  constructor(private ser: MealService, public dialog: MatDialog, public active: ActivatedRoute,
    public dialogRef: MatDialogRef<AddMealComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal) {

    this.u = JSON.parse(localStorage.getItem("user"));
    this.newMeal.UserCode = this.u.userCode;
    if (data != null)
      this.newMeal = data
    console.log(this.newMeal)

  }
  ngOnInit(): void {
  }

  saveMeal() {
    console.log(this.newMeal)
    this.ser.AddMeal(this.newMeal).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
    })
  }
  updateMeal() {
    console.log(this.newMeal)
    this.ser.UpdateMeal(this.newMeal).subscribe(succ => {
      console.log(succ);
    }, err => {
      console.log(err);
    })
  }

  addProduct() {
    console.log(this.newProduct)
    this.ELEMENT_DATA.push(this.newProduct)
    this.newProduct = new Product(null, null, null, null, null)

  }

  addPro() {
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
  deletePro() {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '30%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result)
        // this.ELEMENT_DATA.splice(this.selectRow, 1);

        console.log(this.ELEMENT_DATA)
    });
  }

  addPro1() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    this.dialog.open(AddProductComponent, dialogConfig);
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
