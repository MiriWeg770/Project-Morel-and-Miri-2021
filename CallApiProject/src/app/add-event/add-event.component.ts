import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/Models/Event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  edit:boolean=false
  Event:Event=new Event(null,null,null,null)
  constructor( public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event) { 
      if(data!=null){
      this.edit=true
      this.Event=data
      }
 
    }
  ngOnInit(): void {
  }

}
