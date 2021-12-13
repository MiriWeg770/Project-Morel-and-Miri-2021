import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/Models/User';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { PictureService } from '../picture.service';
import { Picture } from 'src/Models/Picture';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  update=false
  img;
  url;
  constructor(private router:Router,public dialogRef: MatDialogRef<MyAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,private ser:UserService,private serp:PictureService) { 
      console.log(data)
      if(data.pictureCode!=null){    
      serp.GetPictureById(this.data.pictureCode).subscribe(succ=>{
        this.img=succ.pictureName
        console.log(this.img)
      },err=>{console.log(err)})
    }
    else{
      this.img="../../assets/user.jpg"
    }
  }
 
  ngOnInit(): void {
  }
  signOut(){
    localStorage.removeItem("user")
    this.router.navigate(["/Home"]).then(()=>{
     window.location.reload()
    });
  }
  save(){
    let p:Picture= new Picture(0,this.url,null)    
    if(this.url){
      this.serp.AddPicture(p).subscribe(succ=>{
        this.data.pictureCode=succ.pictureCode;
        this.ser.UpdateUser(this.data).subscribe(succ=>{
       console.log(succ)
       this.update=false
      },err=>{console.log(err)})
      },err=>{console.log(err)})
    }
    else{
      this.ser.UpdateUser(this.data).subscribe(succ=>{
        console.log(succ)
        this.update=false
      },err=>{console.log(err)})
    }
 }
 onSelectFile(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    console.log(event.target.files[0].name);
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
      this.img=this.url
      console.log(this.img);    
    }
  }
}
 
}
