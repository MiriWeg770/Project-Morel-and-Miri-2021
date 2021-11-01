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
  meal:Meal=null;
  level:string=""
  Instructions:string[]=[]
  constructor(public dialogRef: MatDialogRef<DownloadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal,private ser:MealService,private serl:LevelService) { 
   this.meal=data
   console.log(this.data)
   this.ser.GetProductsMeal(this.meal.mealCode).subscribe(succ=>{
     console.log(succ)
     this.meal.products=succ; 
     this.GetLevel()

     let x:string=""
     for (let index = 0; index < this.meal.instructions.length; index++) {
       if(this.meal.instructions[index]=='#'){
          this.Instructions.push(x)
          x=""
       }
      else
         x+=this.meal.instructions[index]       
     }  
     
   },err=>{
     console.log(err)
   }) 

  }

  ngOnInit(): void {  

  }

  GetLevel(){
    this.serl.GetAllLevels().subscribe(succ => { 
      succ.forEach(element => {
        if(element.levelCode==this.meal.levelCode)
          this.level= element.levelName;
      });
     }, err => {
       console.log(err)
     })
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
  var data = document.getElementById('x');
  // data.style.display="block"
  html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); 
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save(this.meal.mealName+" מתכון "); 
  });
}

}

