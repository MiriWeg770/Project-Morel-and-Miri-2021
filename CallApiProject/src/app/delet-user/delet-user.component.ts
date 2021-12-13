import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delet-user',
  templateUrl: './delet-user.component.html',
  styleUrls: ['./delet-user.component.css']
})
export class DeletUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
