import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/Models/Product';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  pro:Product=null
  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,private ser:MealService) { 
      if(data==null)
       this.pro= new Product(0,null,null,null,null)
       else
       this.pro=data
    }

  ngOnInit(): void {
  }
  Add(){
    this.ser.AddProduct(this.pro).subscribe(succ=>{
      console.log(succ)
    },err=>{console.log(err)})
  }

}
