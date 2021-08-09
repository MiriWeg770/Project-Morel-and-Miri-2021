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


@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {

  
 ELEMENT_DATA: Product[] = [
  new Product(1,"apple", 12,"gram","osem")
  
  ];
  newMeal:Meal= new Meal(null,null,null,null,null,null,null,null,null);
  displayedColumns: string[] = ['position', 'name', 'amount', 'amount_name','company','edit','delet'];
  // dataSource = ELEMENT_DATA;
  selectRow:Product;
  constructor(private ser:MealService,private dialogRef:MatDialogRef<AddMealComponent>,public dialog:MatDialog) {
    
  }
  ngOnInit(): void {
  }
  addProduct($event){
    
  }
 newProduct:Product;
  addPro(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '30%',
      data: {product:this.newProduct}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newProduct = result;
      console.log(this.newProduct)
    });
  }







  saveMeal(){
    console.log(this.newMeal)
    // this.mealService.GetAllMeals().
  }

  onRowClicked(event:Product){
    // this.selectRow=x;
    console.log(event.ProductName)
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
  deletePro(){
      const dialogConfig=new MatDialogConfig();
      dialogConfig.autoFocus=true;
      dialogConfig.width="30%";
      this.dialog.open(DeleteProductComponent,dialogConfig);
     }   
  
   
}
