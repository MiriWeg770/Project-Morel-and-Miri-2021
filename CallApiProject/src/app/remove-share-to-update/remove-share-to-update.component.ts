import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-share-to-update',
  templateUrl: './remove-share-to-update.component.html',
  styleUrls: ['./remove-share-to-update.component.css']
})
export class RemoveShareToUpdateComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<RemoveShareToUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data:boolean) { }

  ngOnInit(): void {
  }

}
