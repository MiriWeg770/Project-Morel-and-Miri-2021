import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from 'src/Models/Menu';

@Component({
  selector: 'app-share-menu',
  templateUrl: './share-menu.component.html',
  styleUrls: ['./share-menu.component.css']
})
export class ShareMenuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShareMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu) { }

  ngOnInit(): void {
  }

}
