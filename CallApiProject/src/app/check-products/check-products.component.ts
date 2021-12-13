import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/Models/Product';
import { UnitMeasure } from 'src/Models/UnitMeasure';
import { UnitMeasureService } from '../unit-measure.service';

@Component({
  selector: 'app-check-products',
  templateUrl: './check-products.component.html',
  styleUrls: ['./check-products.component.css']
})
export class CheckProductsComponent implements OnInit {

  UnitMeasures:UnitMeasure[]=[]
  constructor(public dialogRef: MatDialogRef<CheckProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Product[],private seru:UnitMeasureService) { 
      this.GetAllUnitMeasures()
    }

  ngOnInit(): void {
  }

  GetAllUnitMeasures(){
    this.seru.GetAllUnitMeasures().subscribe(succ=>{
      this.UnitMeasures=succ
    }),err=>{console.log(err)}
  }
  

}
