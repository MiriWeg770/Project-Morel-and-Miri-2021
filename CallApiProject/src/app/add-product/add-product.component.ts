import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/Models/Product';
import { AddMealComponent } from '../add-meal/add-meal.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  @Output()
  myAddEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Input()
  newProduct:Product=new Product(null,null,null,null,null);
  a=true;
  e=true;
  d=true;
  reciveRow:Product
  editProduct:Product
  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Product) {
    // console.log(this.reciveRow)
   }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
   }
   saveProduct(){
    alert("המוצר התווסף בהצלחה!!");
    // this.myAddEvent.emit(this.newProduct);
    // this.newProduct=new Product(null,null,null,null,null); 
    
    // this.closeDialog();
    this.data=this.editProduct

    this.dialogRef.close()
   }


   
}
