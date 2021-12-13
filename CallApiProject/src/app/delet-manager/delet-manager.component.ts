import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-delet-manager',
  templateUrl: './delet-manager.component.html',
  styleUrls: ['./delet-manager.component.css']
})
export class DeletManagerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {
  }

}
