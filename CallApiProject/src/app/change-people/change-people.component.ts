import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { DownloadComponent } from '../download/download.component';

@Component({
  selector: 'app-change-people',
  templateUrl: './change-people.component.html',
  styleUrls: ['./change-people.component.css']
})
export class ChangePeopleComponent implements OnInit {
   meal:Meal;
  constructor( public dialogRef: MatDialogRef<ChangePeopleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Meal,private dialog:MatDialog,private router:Router) { 
      this.meal=data
    }

  ngOnInit(): void {
  }
  //  x= new DownloadComponent(this.data)

  download(x:boolean){
    let m:Meal;
    // if(x){
    //   m=this.meal;
    // }
    // else{
    //   m=this.data
    // }

    m=x?this.meal:this.data
    const dialogRef = this.dialog.open(DownloadComponent, {
      data: m,
      // width:'100%',
      height:'100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
//  @Output()
//  down:EventEmitter<Meal>= new EventEmitter<Meal>();
  // change(){
  //   console.log(this.meal)
    

  //   const dialogRef = this.dialog.open(DownloadComponent, {
  //     data: this.meal
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }


  
}
