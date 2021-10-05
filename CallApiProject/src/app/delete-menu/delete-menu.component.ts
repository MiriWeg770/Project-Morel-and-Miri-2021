import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.css']
})
export class DeleteMenuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Boolean) { }

  ngOnInit(): void {
  }

}
