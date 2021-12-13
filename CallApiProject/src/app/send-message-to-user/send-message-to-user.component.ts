import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/Models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-send-message-to-user',
  templateUrl: './send-message-to-user.component.html',
  styleUrls: ['./send-message-to-user.component.css']
})
export class SendMessageToUserComponent implements OnInit {
 mess;
 sub;
  constructor( public dialogRef: MatDialogRef<SendMessageToUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,private serUser:UserService) { }

  ngOnInit(): void {
  }
  send(){
    this.serUser.sendMessage(this.mess,this.sub,this.data.mail).subscribe(succ=>{
      console.log(succ)
    },err=>{console.log(err)})
  }

}
