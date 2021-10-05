import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import    jsPDF from 'jspdf';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas'

import { Meal } from 'src/Models/Meal';
import { MealService } from '../meal.service';
// import * as jsPDF from 'jspdf'
// import * as html2canvas from "html2canvas";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @ViewChild('x') content:ElementRef;
  meal:Meal=null;
  
  x;
  
  constructor(public dialogRef: MatDialogRef<DownloadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal,private dialog:MatDialog,private ser:MealService) { 
   this.meal=data
   console.log(this.data)
   this.ser.GetProductsMeal(this.meal.mealCode).subscribe(succ=>{
     console.log(succ)
     this.meal.products=succ;
   },err=>{
     console.log(err)
   })
  }

  ngOnInit(): void {  

  }



  download(){
   this.dialogRef.close()
   console.log("download")
//    html2canvas(this.content.nativeElement).then(canvas=>{
//    let imgWidth=210;
//    let imgHeight=297
//    const contentDataUrl = canvas.toDataURL('image/png')
//    let pdf =  new jsPDF('l','mm','a4')
//    var position = 10;
//   pdf.save(this.data.mealName +" מתכון")
//  })
var data = document.getElementById('x');
document.getElementById('x').style.display="block";

    // html2canvas(data).then(canvas => {
    //   var imgHeight = canvas.height * 208 / canvas.width;
    //   const contentDataURL = canvas.toDataURL('image/png')
    //   let pdf = new jspdf();
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 208, imgHeight)
    //   pdf.save(this.meal.mealName+"-מתכון");
       
    // });
  

}


 
}
