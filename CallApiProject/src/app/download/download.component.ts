import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jspdf, * as  jsPDF from 'jspdf';
// import jsPDF from 'jspdf';

import { Meal } from 'src/Models/Meal';

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
    @Inject(MAT_DIALOG_DATA) public data: Meal,private dialog:MatDialog) { 
   this.meal=data
   console.log(this.data)
  //  this.download()
  }

  ngOnInit(): void {  

  }

// download(){
//   this.data=event
//    console.log(this.data)
//    this.download()
// this.dialogRef.close()
//   let doc = new jsPDF();

//   let content = this.content;
//   console.log(content)
//   console.log(document.getElementById('x'))
 
//   doc.save(this.data.mealName +" מתכון")

// }

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
document.getElementById('x').style.display="block";
var data = document.getElementById('x');
    html2canvas(data).then(canvas => {
      var imgHeight = canvas.height * 208 / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf();
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 208, imgHeight)
      pdf.save(this.meal.mealName+"-מתכון");
    });
  

}
}
