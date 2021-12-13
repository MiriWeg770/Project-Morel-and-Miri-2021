import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import jsPDF from 'jspdf';
import { NgxPrintModule } from 'ngx-print';
import { Meal } from 'src/Models/Meal';
import { Product } from 'src/Models/Product';
import { UnitMeasure } from 'src/Models/UnitMeasure';
import { User } from 'src/Models/User';
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
  @ViewChild('printMeal') printMeal: ElementRef;
  meal: Meal = new Meal(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
  Instructions: string[] = []
  u: User;
  count: number = 0;
  category: string = "";
  level: string = "";
  products: Product[] = []
  from: string = "";
  to: string = "";
  add = false
  UnitMeasures: string[] = []
  unit: UnitMeasure[] = []
  url;
  proCalc: number[] = []
  userImg;
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
    window.scrollTo(0, 0)

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
  Time() {
    let t: Date = new Date(this.meal.preparationTime)
    if (t.getHours() > 0 && t.getMinutes() > 0)
      return t.getHours() + " שעות ו " + t.getMinutes() + " דקות "
    else if (t.getHours() <= 0 && t.getMinutes() > 0)
      return t.getMinutes() + " דקות "
    else if (t.getHours() > 0 && t.getMinutes() <= 0)
      return t.getHours() + " שעות "
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
  interval
  openMessage() {
    console.log(this.add)
    if (this.add)
      document.getElementById("dialog2").style.display = "block"
    else
      document.getElementById("dialog").style.display = "block"
    let x = 0
    this.interval = setInterval(() => {
      x++
      if (x == 5) {
        this.closeMessage()
      }
      console.log(x)
    }, 1000)
  }
  closeMessage() {
    clearInterval(this.interval)
    document.getElementById("dialog").style.display = "none"
    document.getElementById("dialog2").style.display = "none"
  }
  addMeal() {
    if (this.u != null) {
      let pro: Product[] = this.meal.products;
      pro.forEach(element => {
        element.productCode = 0
      });
      let m: Meal = new Meal(0, this.meal.mealName, this.meal.instructions, this.meal.numberOfDiners, this.meal.discription, this.meal.mealCategoryCode, this.u.userCode, null, this.meal.preparationTime, null, new Date(), this.meal.pictureCode, false, null, null, this.u.userName, pro, this.meal.levelCode)
      console.log(m)
      this.ser.AddMealToUser(m).subscribe(succ => {
        console.log(succ)
        this.add = true
        this.closeMessage()
        this.openMessage()
      }, err => {
        console.log(err)
      })
    }
    else {
      const dialogRef = this.dialog.open(MakeAccountComponent, {
      });
    }
  }
  deletMeal() {
    this.meal.userCode = this.u.userCode
    this.ser.DeleteMeal(this.meal).subscribe(succ => { console.log(succ) }, err => { console.log(err) })
    this.add = false
    this.closeMessage()
    this.openMessage()
  }
  GetProducts(code: number) {
    this.ser.GetProductsMeal(code).subscribe(succ => {
      console.log(succ)
      this.meal.products = succ;
      this.products = succ
      this.GetAllUnitMeasures()
      this.meal.products.forEach(element => {
        this.proCalc.push(this.calcAmount(element.amountInMeal))
      });
    }, err => {
      console.log(err)
    })
  }
  GetUser(id: number) {
    this.serUser.GetUserById(id).subscribe(succ => {
      this.meal.userName = succ.userName
      if (succ.pictureCode != null) {
        this.serp.GetPictureById(succ.pictureCode).subscribe(succ => {
          this.userImg = succ.pictureName
        }, err => { console.log(err) })
      }
      else {
        this.userImg = "../../assets/user.jpg"
      }

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
  GetAllUnitMeasures() {
    this.seru.GetAllUnitMeasures().subscribe(succ => {
      console.log(succ)
      console.log(this.meal.products)
      this.unit = succ
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
  GetPicture(x: number) {
    this.serp.GetPictureById(x).subscribe(succ => {
      this.url = succ.pictureName
    }, err => {
      console.log(err)
    })
  }
  download() {
    this.meal.numberOfDiners = this.count
    document.getElementById("d").style.display = "block";
    // document.getElementById("d").style.opacity="0";

    var data = document.getElementById('d')
    html2canvas(data).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a4')
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, 295, canvas.height * 309 / canvas.width)
      pdf.save(this.meal.mealName + "-מתכון");
      document.getElementById("d").style.display = "none";

    })
  }
  change() {
    this.meal.numberOfDiners = this.count
    console.log("print")
    this.print()
  }
  print() {
    document.getElementById("d").style.display = "block";
    var data = document.getElementById('d')
    html2canvas(data).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a4')
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, 295, canvas.height * 309 / canvas.width)
      window.print();
      document.getElementById("d").style.display = "none";

    })
  }

  calcAmount(x: number) {
    return x / this.meal.numberOfDiners;
  }
  convetToPDF() {
    document.getElementById('spinner').style.display = "block";
    this.meal.numberOfDiners = this.count
    var data = document.getElementById('d')
    html2canvas(data).then(canvas => {
      const contentDataUrl = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a4')
      pdf.addImage(contentDataUrl, 'PNG', 0, 0, 295, canvas.height * 309 / canvas.width)
      let binary = pdf.output();
      this.sendMeal(btoa(binary))
      document.getElementById('spinner').style.display = "none";
      document.getElementById("send").style.display = "none";

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
  plus() {
    this.count++
    this.calcAmountProducts(this.count)
  }
  minus() {
    if (this.count > 1)
      this.count--
    if (this.count < 1)
      this.count = 1
    this.calcAmountProducts(this.count)
  }
  calcAmountProducts(c: number) {
    let x = 0
    let z = 0
    let y = 0
    console.log("*******************************")

    this.meal.products.forEach(element => {
      y = c * this.proCalc[x]
      z = y
      this.unit.forEach(element1 => {
        if (element.unitMeasureCode == element1.convertionMeasureCode) {
          if (y >= Number(element1.convertionMeasureAmount)) {
            this.unit.forEach(unit => {
              if (unit.unitCode == element1.unitCode) {
                this.UnitMeasures[x] = unit.unitName
                console.log(y + "----------" + unit.unitName)
                z = Number((y / Number(element1.convertionMeasureAmount)).toFixed(2));
              }
            });
          }
          else {
            this.unit.forEach(element3 => {
              if (element3.unitCode == element1.convertionMeasureCode) {
                this.UnitMeasures[x] = element3.unitName
              }
            });
          }
        }
        else {
          element.amountInMeal = Number(z.toFixed(2));
        }
      });
      x++
    });
  }
  MealChange() {
    this.meal.numberOfDiners = this.count
    return this.meal;
  }
}
