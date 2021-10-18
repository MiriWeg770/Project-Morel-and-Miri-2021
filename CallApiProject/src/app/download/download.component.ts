import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
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
      //  this.openPDF()
      // this.d()

   },err=>{
     console.log(err)
   })
  }

  ngOnInit(): void {  

  }


d(){}
  download(){
   this.dialogRef.close()
   console.log("download")
   var data = document.getElementById('x')
   html2canvas(data).then(canvas=>{
   let imgWidth=309;
   let imgHeight=295

   const contentDataUrl = canvas.toDataURL('image/png')
   let pdf =  new jsPDF('l','mm','a4')
  pdf.addImage(contentDataUrl, 'PNG', 0, 0, 309, canvas.height*309/canvas.width)
  pdf.save(this.meal.mealName+"-מתכון");  
  })
document.getElementById('x').style.display="block";

    // html2canvas(data).then(canvas => {
    //   var imgHeight = canvas.height * 208 / canvas.width;
    //   const contentDataURL = canvas.toDataURL('image/png')
    //   let pdf = new jspdf();
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 208, imgHeight)
    //   pdf.save(this.meal.mealName+"-מתכון");
       
    // });
  

}

//  openPDF():void {
//   var data = document.getElementById('x');
//   var html = htmlToPdfmake(data.innerHTML);
//   const documentDefinition = { content: html };
//   pdfMake.createPdf(documentDefinition).download(); 
       
//   }
  
// @ViewChild('x',{static:false}) el:ElementRef;
// d(){
//   let pdf = new jsPDF('p','pt','a4');
//   pdf.html(this.el.nativeElement,{
//   callback:(pdf)=>{pdf.output("pdfobjectnewwindow")}
//   })
// }
 
}
import {jsPDF} from 'jspdf';
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// const htmlToPdfmake = require("html-to-pdfmake");
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;