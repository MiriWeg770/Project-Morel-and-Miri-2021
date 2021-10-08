import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delet-menu',
  templateUrl: './delet-menu.component.html',
  styleUrls: ['./delet-menu.component.css']
})
export class DeletMenuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Boolean) { }

  ngOnInit(): void {
  }

}
