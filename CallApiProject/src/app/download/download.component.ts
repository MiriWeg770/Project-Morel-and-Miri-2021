import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf, {jsPDF} from 'jspdf';
import { LevelService } from '../level.service';
import { Meal } from 'src/Models/Meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  @ViewChild('x') content:ElementRef;
  level:string=""
  Instructions:string[]=[]
  
  @Input()
  meal:Meal
  constructor() { 
 
  //  this.convetToPDF()
  //  this.ser.GetProductsMeal(this.meal.mealCode).subscribe(succ=>{
  //    console.log(succ)
  //    this.meal.products=succ; 
  //    this.GetLevel()

  //    let x:string=""
  //    for (let index = 0; index < this.meal.instructions.length; index++) {
  //      if(this.meal.instructions[index]=='#'){
  //         this.Instructions.push(x)
  //         x=""
  //      }
  //     else
  //        x+=this.meal.instructions[index]       
  //    }  
     
  //  },err=>{
  //    console.log(err)
  //  }) 

  }

  ngOnInit(): void {  

  }

  print(){
    // const printContent = document.getElementById("d");
    // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.close();
    // WindowPrt.focus();
    // window.print();
    // WindowPrt.close();  
  }
  GetLevel(){
    // this.serl.GetAllLevels().subscribe(succ => { 
    //   succ.forEach(element => {
    //     if(element.levelCode==this.meal.levelCode)
    //       this.level= element.levelName;
    //   });
    //  }, err => {
    //    console.log(err)
    //  })
  }
//   download(){
//    this.dialogRef.close()
//    console.log("download")
//    document.getElementById("x").style.display="block"
//    var data = document.getElementById('x')
   
//    html2canvas(data).then(canvas=>{
//    let imgWidth=309;
//    let imgHeight=295

//    const contentDataUrl = canvas.toDataURL('image/png')
//    let pdf =  new jsPDF('l','mm','a4')
//   pdf.addImage(contentDataUrl, 'PNG', 0, 0, 309, canvas.height*309/canvas.width)
//   pdf.save(this.meal.mealName+"-מתכון");  
//   })
// document.getElementById('x').style.display="block";

  
// }



 convetToPDF() {
  html2canvas(document.getElementById('x')).then(canvas => {
    var imgWidth = 208;
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jspdf('p', 'mm', 'a4'); 
    pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, 100)
    pdf.save("ss")
});
  
  // let pdf= new jsPDF('p','mm','a4');
  // pdf.html(document.getElementById("x"),{
  //   callback:(pdf)=>{
  //     pdf.save("ss")
  //   }
  // })
}

  generatePdf(){
   const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
   pdfMake.createPdf(documentDefinition).open();
  }
 


  
}

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;