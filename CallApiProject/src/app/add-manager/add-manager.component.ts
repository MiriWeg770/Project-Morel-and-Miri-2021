import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Picture } from 'src/Models/Picture';
import { User } from 'src/Models/User';
import { PictureService } from '../picture.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent implements OnInit {
  UserText=""
  Users:User[]=[]
  Pictures:Picture[]=[]
  UsersTable:string[]=["","קוד משתמש","שם משתמש"," כתובת אימייל"]
  constructor(public dialogRef: MatDialogRef<AddManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public manager: User,private ser:UserService,private picSer:PictureService) {
    this.GetAllUsers()
    }

  ngOnInit(): void {
  }
  GetAllUsers(){
    this.ser.GetAllUsers().subscribe(succ=>{
    this.Users=succ
    this.arrUser=succ
    console.log(succ)
    },err=>{console.log(err)})
  }
  GetPictures(){
    this.picSer.GetAllPictures().subscribe(succ=>{
      this.Pictures=succ
      console.log(succ)
   },err=>{
     console.log(err)
   })
  }
  GetPicture(x:number){
    let url="../../assets/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620.jpg";
    this.Pictures.forEach(element => {
     if(element.pictureCode==x)
        url= element.pictureName
   });
  return url     
  }
  findUser:User[]=[]
  arrUser:User[]=[]
  SearchUser(){
    if(this.UserText==""){
      this.Users=this.arrUser
    }
    else{
      console.log(this.UserText)
      this.findUser.length=0;
      this.Users=this.arrUser
      this.Users.forEach(element => {
      if(element.userName.includes(this.UserText)){ 
      this.findUser.push(element);  
   }
  });
   this.Users=this.findUser
  }}
  Add(){
    this.ser.SignUp(this.manager).subscribe(succ=>{
      console.log(succ)
    },err=>{console.log(err)})
  }
  AddUser(x:User){
      x.manager=true
      this.ser.UpdateUser(x).subscribe(succ=>{
        console.log(succ)
        this.dialogRef.close()
      },err=>{console.log(err)})   
}

}
