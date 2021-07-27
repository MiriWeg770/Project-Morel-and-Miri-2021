import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delet-meal',
  templateUrl: './delet-meal.component.html',
  styleUrls: ['./delet-meal.component.css']
})
export class DeletMealComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletMealComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Boolean) { }

  ngOnInit(): void {
  }


}
