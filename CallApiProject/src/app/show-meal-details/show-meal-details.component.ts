import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'console';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import jsPDF from 'jspdf';
import { Meal } from 'src/Models/Meal';
import { Product } from 'src/Models/Product';
import { UnitMeasure } from 'src/Models/UnitMeasure';
import { User } from 'src/Models/User';
import { ChangePeopleComponent } from '../change-people/change-people.component';
import { DownloadComponent } from '../download/download.component';
import { LevelService } from '../level.service';
import { MakeAccountComponent } from '../make-account/make-account.component';
import { MealCategoriesService } from '../meal-categories.service';
import { MealService } from '../meal.service';
import { PictureService } from '../picture.service';
import { UnitMeasureService } from '../unit-measure.service';
import { UserService } from '../user.service';
// import * as jsPDF from 'jspdf'
@Component({
  selector: 'app-show-meal-details',
  templateUrl: './show-meal-details.component.html',
  styleUrls: ['./show-meal-details.component.css']
})
export class ShowMealDetailsComponent implements OnInit {

  meal: Meal = new Meal(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

  // bgVariable:Boolean=false
  // headerVariable:boolean=false

  Instructions: string[] = []
  more: Meal[] = []
  u: User;
  count: number = 0;
  category: string = "";
  level: string = "";
  products: Product[] = []
  unitMeasures: UnitMeasure[] = [];

  from: string = "";
  to: string = "";
  constructor(private router: ActivatedRoute, private serp: PictureService, private ser: MealService, private serc: MealCategoriesService, private seru: UnitMeasureService, private serl: LevelService, private serUser: UserService, private _snackBar: MatSnackBar, private dialog: MatDialog) {
    this.u = JSON.parse(localStorage.getItem("user"))
    this.router.params.subscribe(parameters => {
      let code = +parameters["id"];
      ser.GetMealById(code).subscribe(succ => {
        this.meal = succ
        this.GetProducts(this.meal.mealCode)
        console.log(this.meal)
        this.GetUser(this.meal.userCode)
        this.GetInstructions()
        this.count = this.meal.numberOfDiners
        this.GetCategory()
        this.GetLevel()
        this.MealIsExists()
        this.GetPicture(this.meal.pictureCode)
      }, err => { console.log(err) })
    });



  }


  ngOnInit(): void {
    window.scrollTo(0, 0);


  }
  close() {
    document.getElementById("send").style.display = "none";
  }
  open() {
    document.getElementById("send").style.display = "block";
  }
  Date() {
    let d: Date = new Date(this.meal.dateUplaod)
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  MealIsExists() {
    if (this.u != null) {
      let m: Meal = this.meal
      m.userCode = this.u.userCode
      console.log(m)
      this.ser.MealIsExists(m).subscribe(succ => {
        console.log(succ)
        this.add = succ
      }, err => { console.log(err) })
    }
  }


  add = false
  addMeal() {
    if (this.u != null) {
      let m: Meal = new Meal(0, this.meal.mealName, this.meal.instructions, this.meal.numberOfDiners, this.meal.discription, this.meal.mealCategoryCode, this.u.userCode, null, this.meal.preparationTime, null, new Date(), this.meal.pictureCode, false, null, null, this.u.userName, this.meal.products, this.meal.levelCode)
      console.log(m)
      this.ser.AddMealToUser(m).subscribe(succ => {
        console.log(succ)
        this.add = true
        this._snackBar.open("המנה התווספה ", "סגור", {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }, err => {
        console.log(err)
      })
    }
    else {
      const dialogRef = this.dialog.open(MakeAccountComponent, {
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
  }


  deletMeal() {
    this.meal.userCode = this.u.userCode
    this.ser.DeleteMeal(this.meal).subscribe(succ => { console.log(succ) }, err => { console.log(err) })
    this.add = false
    this._snackBar.open("המנה הוסרה ", "סגור", {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  GetProducts(code: number) {
    this.ser.GetProductsMeal(code).subscribe(succ => {
      console.log(succ)
      this.meal.products = succ;
      this.calcAmountProducts();
      this.GetAllUnitMeasures()
    }, err => {
      console.log(err)
    })
  }

  GetUser(id: number) {
    this.serUser.GetUserById(id).subscribe(succ => {

      this.meal.userName = succ.userName
    }, err => {
      console.log(err)
    })
  }

  GetInstructions() {
    this.Instructions = []
    let x: string = ""
    for (let index = 0; index < this.meal.instructions.length; index++) {
      if (this.meal.instructions[index] == '#') {
        this.Instructions.push(x)
        x = ""
      }
      else
        x += this.meal.instructions[index]
    }
    console.log(this.Instructions)
  }

  GetLevel() {
    this.serl.GetAllLevels().subscribe(succ => {
      succ.forEach(element => {
        if (element.levelCode == this.meal.levelCode)
          this.level = element.levelName;
      });
    }, err => {
      console.log(err)
    })
  }
  GetCategory() {
    this.serc.GetAllCategories().subscribe(succ => {
      succ.forEach(element => {
        if (element.mealCategoriesCode == this.meal.mealCategoryCode)
          this.category = element.mealCategoriesName;
      });
    }, err => {
      console.log(err)
    })
  }
  UnitMeasures: string[] = []
  GetAllUnitMeasures() {
    this.seru.GetAllUnitMeasures().subscribe(succ => {
      console.log(succ)
      this.unitMeasures = succ;
      console.log(this.meal.products)
      this.meal.products.forEach(element => {
        for (let index = 0; index < succ.length; index++) {
          if (element.unitMeasureCode == succ[index].unitCode) {
            let x = ""
            if (element.amountInMeal > 1) {
              switch (succ[index].unitName) {
                case "יחידה": x = "יחידות"; break;
                case "כף": x = "כפות"; break;
                case "כפית": x = "כפיות"; break;
                case "ליטר": x = "ליטרים"; break;
                case "כוס": x = "כוסות"; break;
                default: x = succ[index].unitName; break;
              }
              this.UnitMeasures.push(x)
            }
            else { this.UnitMeasures.push(succ[index].unitName) }

          }
        }
      });
    }), err => { console.log(err) }

  }

  GetMeasure(x: Product) {
    let p: Product = new Product(x.productCode, x.productName, x.amountInMeal, x.unitMeasureCode, x.company, x.mealCode)
    console.log(p)
    this.UnitMeasures.forEach(element => {

    });

  }


  url;
  GetPicture(x: number) {
    this.serp.GetPictureById(x).subscribe(succ => {
      this.url = succ.pictureName
      // console.log(this.url)
    }, err => {
      console.log(err)
    })
  }
  download() {
    this.meal.numberOfDiners = this.count
    const dialogRef = this.dialog.open(DownloadComponent, {
      data: this.meal,
      height: '100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  print() {
    // let printContents = document.getElementById('b');
    //  document.body=printContents;
    window.print();
  }

  // plus(){
  // this.count++
  // this.meal.products.forEach(element => {
  //   element.amountInMeal++
  // });
  // }
  // minus(){
  //   if(this.count!=1){
  //     this.count--
  //     this.meal.products.forEach(element => {
  //       element.amountInMeal--
  //     });
  //   }
  // }

  plus() {
    this.count++;
    this.calcAmountProducts();
  }
  minus() {
    if (this.count != 1) {
      this.count--;
      this.calcAmountProducts();
    }
  }

  calcAmountProducts() {
    this.meal.products.forEach(element => {
      element.allamountInMeal = element.amountInMeal * this.count;
      if (element.allamountInMeal > 100) {
        let unit = this.unitMeasures.find(x => x.unitName == 'גרם');
        if (unit) {
          element.unitMeasureCode = this.unitMeasures.find(x => x.unitName == "ק''ג").unitCode;
          element.allamountInMeal /= 1000;
          element.amountInMeal /= 1000;
        }
      }
    })
  }


  convetToPDF() {
    // this.close()
    document.getElementById("spinner").style.display = "block";
    window.scrollTo(0, 0)
    html2canvas(document.getElementById('b')).then(canvas => {
      var imgWidth = 208;
      // var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, 100)
      let binary = pdf.output();
      this.sendMeal(btoa(binary))
    });
  }

  sendMeal(f) {
    console.log(this.from)
    console.log(this.to)
    this.ser.SendMealInMail(this.from, this.to, f).subscribe(succ => {
      console.log(succ)
      this.close()
      document.getElementById("spinner").style.display = "none";
      this._snackBar.open("האימייל נשלח ", "סגור", {
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }, err => { console.log(err) })
  }



}
