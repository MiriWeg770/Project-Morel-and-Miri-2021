import { Component, OnInit } from '@angular/core';
import { Product } from 'src/Models/Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


  newProduct:Product=new Product(null,null,null,null,null);
  constructor() { }

  ngOnInit(): void {
  }

}
