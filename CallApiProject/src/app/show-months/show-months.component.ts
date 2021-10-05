import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-months',
  templateUrl: './show-months.component.html',
  styleUrls: ['./show-months.component.css']
})
export class ShowMonthsComponent implements OnInit {
  date:Date=new Date()
  year:number
  weekdays:string[]=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"]
  months:string[]=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"]
 
  constructor( public dialogRef: MatDialogRef<ShowMonthsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Date) {
      console.log(data)
      this.date=data
      this.year=data.getFullYear()
    }

  ngOnInit(): void {
  }

  YearBefor(){
    if(this.year>this.data.getFullYear()){
     this.year=this.year-1
     this.data.setFullYear(this.year)
    }
  }
  nextYear(){
    if(this.year<this.data.getFullYear()+10){
    this.year=this.year+1
    this.data.setFullYear(this.year)
    }
  }
  ChangeMonth(i){
    this.data.setMonth(i)
    }
}
