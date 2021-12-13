import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';
import jspdf, { jsPDF } from 'jspdf';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { Product } from 'src/Models/Product';
import { UnitMeasure } from 'src/Models/UnitMeasure';
import { User } from 'src/Models/User';
import { DownloadComponent } from '../download/download.component';
import { LevelService } from '../level.service';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { MealService } from '../meal.service';
import { MenuService } from '../menu.service';
import { PictureService } from '../picture.service';
import { UnitMeasureService } from '../unit-measure.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-menu-details',
  templateUrl: './show-menu-details.component.html',
  styleUrls: ['./show-menu-details.component.css']
})
export class ShowMenuDetailsComponent implements OnInit {
  u:User;
  menu:Menu=new Menu(null,null,null,null,null,null,null,null,null,null,null,null,null,null)
  count=0;
  url;
  from:string="";
  to:string="";
  category:string="";
  level:string="";
  products:Product[]=[]
  UnitMeasures:string[]=[]
  unit:UnitMeasure[]=[]
  proCalc:number[]=[]
  add=false
  time:string=''
  constructor(private router:ActivatedRoute,private serun:UnitMeasureService,private serp:PictureService,private ser:MealService,private serl:LevelService,private serm:MenuService,private seru:UserService,private _snackBar: MatSnackBar,private dialog:MatDialog) {
    this.u=JSON.parse(localStorage.getItem("user"))
    this.router.params.subscribe(parameters => {
      let code = +parameters["id"];
       serm.GetMenuById(code).subscribe(succ=>{
        this.menu =succ
        console.log(this.menu)         
        this.GetUser() 
        this.GetCategory()
        this.GetLevel()  
        this.MenuIsExists()
        this.GetMeals() 
        this.count=1
      },err=>{console.log(err)})
      });      

   }

  ngOnInit(): void {
    // this.next()
  }
  userImg
  GetUser(){
      this.seru.GetUserById(this.menu.userCode).subscribe(succ=>{ 
        this.menu.userName=succ.userName
        if(succ.pictureCode!=null){
          this.serp.GetPictureById(succ.pictureCode).subscribe(succ=>{
         this.userImg=succ.pictureName
        //  console.log(this.userImg)
       },err=>{console.log(err)})}
       else{
         this.userImg="../../assets/user.jpg"
       }  
      })  
  }
  GetMeals(){
    console.log(this.menu.menuCode)
    this.serm.GetMenuMeals(this.menu.menuCode).subscribe(succ=>{
     this.menu.meals=succ
     this.GetAllProducts()
     this.GetAllPictures()
     this.time=this.Time()
    },err=>{
      console.log(err)
    })
  }
  Date(){
    let d:Date=new Date(this.menu.dateUpload)
    return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  }
  interval
 openMessage(){
   console.log(this.add)
   if(this.add)
   document.getElementById("dialog2").style.display="block"
   else
   document.getElementById("dialog").style.display="block"
   let x=0
    this.interval = setInterval(() => {
   x++
   if(x==5){
   this.closeMessage()
   }
   console.log(x)
   },1000)
 }
 closeMessage(){
   clearInterval(this.interval)
   document.getElementById("dialog").style.display="none"
   document.getElementById("dialog2").style.display="none"
 }
  addMenu(){
    if(this.u!=null){
    let meals:Meal[]=this.menu.meals;
    meals.forEach(element => {
      element.mealCode=0;
    });
     let m:Menu=new Menu(0,this.menu.menuName,this.menu.discription,this.u.userCode,new Date(),null,0,this.u.userName,null,this.menu.pictureCode,false,this.menu.levelCode,meals,this.menu.menuCategoryCode)
     console.log(m)
     this.serm.AddMenuToUser(m).subscribe(succ=>{
      console.log(succ)   
      // this.menu.userCode=this.code
      // console.log(this.menu)
      this.add=true
      // this._snackBar.open("התפריט התווסף ", "אישור",{
      //  horizontalPosition: 'center',
      //  verticalPosition:'top' 
      //  });
      this.closeMessage()
      this.openMessage()
    },err=>{
      console.log(err)
    })
  }
  else{
    const dialogRef = this.dialog.open(MakeAccountComponent, {  
    });
  }
  }
  deletMenu(){
    this.menu.userCode=this.u.userCode
      this.serm.DeleteMenu(this.menu).subscribe(succ=>{
        console.log(succ)
        this.add=false
        this.closeMessage()
       this.openMessage()
      },err=>{console.log(err)})
    
     
   }
  MenuIsExists(){
    if(this.u!=null){
    let m:Menu=new Menu(0,this.menu.menuName,this.menu.discription,this.u.userCode,new Date(),null,0,this.u.userName,null,this.menu.pictureCode,false,this.menu.levelCode,this.menu.meals,this.menu.menuCategoryCode)
    this.serm.MenuIsExists(m).subscribe(succ=>{
     this.add=succ
     this.menu.userCode=this.menu.userCode
    },err=>{console.log(err)})
    console.log(this.add)
  }
  }
  close(){
    document.getElementById("send").style.display="none";
  }
  open(){
   document.getElementById("send").style.display="block";
  }
  convetToPDF() {
    document.getElementById('spinner').style.display="block";
    var data = document.getElementById('d')  
    html2canvas(data).then(canvas => {  
      var imgWidth = 208;   
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); 
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight)  
        let binary = pdf.output();
        this.sendMenu(btoa(binary))
        document.getElementById('spinner').style.display="none";
        document.getElementById("send").style.display="none";
    });
  }
  sendMenu(f){
    console.log(this.from)
    console.log(this.to)
    this.serm.SendMenuInMail(this.from,this.to,f).subscribe(succ=>{
      console.log(succ)
      this.close()
      document.getElementById("spinner").style.display="none";
      this._snackBar.open("האימייל נשלח ", "סגור",{
        horizontalPosition: 'center',
        verticalPosition:'top' 
        });
    },err=>{console.log(err)})
  }
   
    GetCategory(){
      this.serm.GetAllCategories().subscribe(succ => { 
        succ.forEach(element => {
          if(element.menuCategoriesCode==this.menu.menuCategoryCode)
            this.category= element.menuCategoriesName;
        });
       }, err => {
         console.log(err)
       })
    }
    GetLevel(){
      this.serl.GetAllLevels().subscribe(succ => { 
        succ.forEach(element => {
          if(element.levelCode==this.menu.levelCode)
            this.level= element.levelName;
        });
       }, err => {
         console.log(err)
       })
    }
    GetInstructions(meal:Meal){
      let Instructions=[]
      let x:string=""
      for (let index = 0; index < meal.instructions.length; index++) {
        if(meal.instructions[index]=='#'){
           Instructions.push(x)
           x=""
        }
       else
          x+=meal.instructions[index]  
      }    
      return Instructions;
    }
    GetAllProducts(){
      this.serm.GetMenuProducts(this.menu.menuCode).subscribe(succ=>{
      this.products=succ
     this.GetAllUnitMeasures()   
         this.products.forEach(element => {
           this.proCalc.push(this.calcAmount(element.amountInMeal))
         });
      },err=>{console.log(err)})
    //   let x=0
    //   this.menu.meals.forEach(element => {
    //     x++
    //     this.ser.GetProductsMeal(element.mealCode).subscribe(succ=>{
    //      succ.forEach(p => {
    //        this.products.push(p)
    //      });
    //       console.log(this.products)
    //     
    //     },err=>{
    //       console.log(err)
    //     })
    //     if(x==this.menu.meals.length){
    //    console.log("sss")
    //     }
    // });     
    }
    calcAmount(x:number){
      return x/1;
    }
    GetAllUnitMeasures(){
      this.serun.GetAllUnitMeasures().subscribe(succ=>{
        this.unit=succ
        this.products.forEach(element => {
          for (let index = 0; index < succ.length; index++) {
            if(element.unitMeasureCode==succ[index].unitCode){
               let x=""
                if(element.amountInMeal>1){
                 switch (succ[index].unitName) {        
                  case "יחידה":x="יחידות";break;
                  case "כף":x="כפות";break;                                 
                  case "כפית":x="כפיות";break;
                  case "ליטר":x="ליטרים";break;
                  case "כוס":x="כוסות";break;
                  default:x=succ[index].unitName;break;
                }
                 this.UnitMeasures.push(x)       
                }      
                else{this.UnitMeasures.push(succ[index].unitName)}                                  
            }         
          }
        }); 
      }),err=>{console.log(err)}       
    
    }
 
Time(){
     let hour=0;
     let minute=0; 
     let m=0
    for (let index = 0; index < this.menu.meals.length; index++) {
      let t2:Date= new Date(this.menu.meals[index].preparationTime)    
      hour+=t2.getHours();
      minute+=t2.getMinutes();
    }
    this.menu.meals.forEach(element => {
      
    });
    if(minute>59){
      m+=minute-60
      hour++;
      minute=m;
    }
    if(hour>0 && minute>0)
     return hour+" שעות ו "+minute+" דקות "
     else  if(hour<=0 && minute>0)
     return minute+" דקות "
     else  if(hour>0 && minute<=0)
    return hour+" שעות "
}
GetPicture(x:number){
  let url;
  this.serp.GetPictureById(x).subscribe(succ=>{
    url=succ.pictureName
    this.img.push(url)
 },err=>{
   console.log(err)
 })
}
indexPic=0
img:string[]=[]
GetAllPictures(){
  this.menu.meals.forEach(element => {
   this.GetPicture(element.pictureCode)
  });
  console.log(this.img)
  // this.next()
  this.changePicture()
}
changePicture(){
 this.url=this.img[this.indexPic];
}
prev(){
console.log("prev")
this.indexPic--
console.log(this.indexPic)
if(this.indexPic==-1)
 this.indexPic=this.img.length-1
this.changePicture()
}
next(){
  console.log("next")
this.indexPic++
// console.log(this.indexPic)
if(this.indexPic==this.img.length)
  this.indexPic=0
this.changePicture()
}
 plus(){
  this.count++  
  this.calcAmountProducts(this.count)
}
minus(){
    if(this.count>1)
      this.count--
    if(this.count<1)
      this.count=1
      this.calcAmountProducts(this.count) 
}
calcAmountProducts(c:number) { 
  let x=0
  let z=0
  let y =0      
  console.log("*******************************")
     
  this.products.forEach(element => {
    y=c*this.proCalc[x]
    z=y
    this.unit.forEach(element1 => {
      if(element.unitMeasureCode==element1.convertionMeasureCode){
         if( y>=Number(element1.convertionMeasureAmount)){
           this.unit.forEach(unit => {
           if(unit.unitCode==element1.unitCode){
            this.UnitMeasures[x]=unit.unitName
            console.log(y+"----------"+unit.unitName) 
            z=Number((y/Number(element1.convertionMeasureAmount)).toFixed(2));
           }
          });
        }
     else{
       this.unit.forEach(element3 => {
        if(element3.unitCode==element1.convertionMeasureCode){
          this.UnitMeasures[x]=element3.unitName
          }
         });
        }
       }      
    else{
      element.amountInMeal=Number(z.toFixed(2));
    }
    });         
    x++
  });
}
download(){
  document.getElementById("d").style.display="block";
  // document.getElementById("d").style.opacity="0";
var data = document.getElementById('d')  
  //  html2canvas(data).then(canvas=>{
  //  const contentDataUrl = canvas.toDataURL('image/png')
  //  let pdf =  new jsPDF('l','mm','a4')
  // pdf.addImage(contentDataUrl, 'PNG', 0, 0, 295, canvas.height*309/canvas.width)
  // pdf.save(this.menu.menuName+"-מתכון");  
  // document.getElementById("d").style.display="none";

  // }) 

  // var data = document.getElementById('contentToConvert');  
  html2canvas(data).then(canvas => {  
    var imgWidth = 208;   
    var imgHeight = canvas.height * imgWidth / canvas.width;  
    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jspdf('p', 'mm', 'a4'); 
    pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight)  
    pdf.save(this.menu.menuName+" -תפריט");  
}); 
}

 print(){
    window.print()  
 }

}
