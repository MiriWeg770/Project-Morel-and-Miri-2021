import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnitMeasure } from 'src/Models/UnitMeasure';
import { UnitMeasureService } from '../unit-measure.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {

  UnitMeasures:UnitMeasure[]=[]
  u:UnitMeasure=new UnitMeasure(0,null,null,null)
  constructor(public dialogRef: MatDialogRef<AddUnitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UnitMeasure,private ser:UnitMeasureService) { 
      if(data!=null)
        this.u=data  
        this.ser.GetAllUnitMeasures().subscribe(succ=>{
        this.UnitMeasures=succ
        },err=>{console.log(err)})
    }
   
  ngOnInit(): void {
  }
  no(){
    this.u.convertionMeasureAmount=null
    this.u.convertionMeasureCode=null
  }


}
