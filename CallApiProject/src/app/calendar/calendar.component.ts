import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Event } from 'src/Models/Event';
// import { runInThisContext } from 'vm';
import { AddEventComponent } from '../add-event/add-event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  date:Date
  month:string
  year:number
  day:number
  event:string
  weekdays:string[]=["ראשון","שני","שלישי","רביעי","חמישי","שישי","שבת"]
  months:string[]=["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"]
  monthDays:number[]=[]
  listEvents:Event[]=[]
  list:Event[]=[
    new Event(null,"יום הולדת",new Date('2021-07-30'),"יום הולדת לחברה"),
    new Event(null," מסיבה",new Date('2021-07-30')," מסיבת סיום "),
    new Event(null," מסיבה",new Date('2022-07-30')," מסיבת סיום "),
    new Event(null,"חתונה ",new Date('2021-12-25'),"חתונה  לחברה")
  ]
  thisEvent:Event;
  toggle=false;
  showEvent=false;

  constructor(private dialog:MatDialog,) { }

  ngOnInit(): void {
   this.Today()
  //  this.GetMonthDays(this.date.getMonth())
  }
  Today(){
    this.date=new Date()
    this.month=this.months[this.date.getMonth()];
    this.year=this.date.getFullYear(); 
    // this.day=this.date.getDay()
    this.ChangeMonth(this.date.getMonth())
   }

  CheckDay(x){
   
    if(this.date.getDate()==x && this.date.getFullYear()==this.year && this.months[this.date.getMonth()]==this.month)
      return true;
    return false;
  }
  ChangeMonth(i){
  this.month=this.months[i]
  this.monthDays.length=0
  this.firstDay = new Date(this.year, i, 1).getDay();
  console.log(this.firstDay)
  this.GetMonthDays(i)
  }
  firstDay:number; 
  GetMonthDays(i){
  let daysInMonth = new Date(this.year, i+1, 0).getDate();
  for (let index = 0; index < this.firstDay; index++) {
    this.monthDays.push(0)    
  }
  for (let index = 1; index <= daysInMonth; index++) {
  this.monthDays.push(index)    
  }
  console.log(daysInMonth +" "+ this.month+""+this.monthDays.length)
  console.log(this.monthDays)
  }

  YearBefor(){
    if(this.year>this.date.getFullYear())
     this.year=this.year-1
  }
  nextYear(){
    if(this.year<this.date.getFullYear()+10)
    this.year=this.year+1
  }
  select(x){
    if(x!=0){
    this.listEvents.length=0
    this.day=x
    this.event=this.month+" "+this.day+" ,"+this.year
    this.toggle=true

    this.list.forEach(element => {  
      // console.log(this.month)
      // console.log(this.year)
      // console.log(this.day)   
      // console.log(this.months[element.EventDate.getMonth()])
      // console.log(element.EventDate.getFullYear())
      // console.log(element.EventDate.getDate())

      if(element.eventDate.getDate()==x && element.eventDate.getFullYear()==this.year && this.months[element.eventDate.getMonth()]==this.month)    
        {
          console.log(true)
          this.listEvents.push(element)
        }
      else 
       console.log( false)
    });
  }

   
  }
  DaysLeft(x:Date){
  if(this.date.getFullYear()<=x.getFullYear()){
  let diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
  let d= diffDays(this.date,x);
     if(d==0)
     return "היום";
   return " עוד "+d+" ימים "
  }
  }

  newEvent:Event;
  AddEvent(){
    this.newEvent=new Event(null,null,null,null)
      const dialogRef = this.dialog.open(AddEventComponent, {
      autoFocus:false,
      width: '250px',
      data:this.newEvent,
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');   
        console.log(result) 
        this.newEvent=result
        this.newEvent.eventDate=new Date(this.year,this.months.indexOf(this.month),this.day)
        this.list.push(this.newEvent)
        this.select(this.newEvent.eventDate.getDate())

     });  
    }

openEvent(x:Event){
  console.log(x)
  const dialogRef = this.dialog.open(AddEventComponent, {
  autoFocus:false,
  width: '250px',
  data:x,
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');   
    console.log(result) 
 });  

}
}