import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';
import { Product } from 'src/Models/Product';
import { UnitMeasure } from 'src/Models/UnitMeasure';

@Component({
  selector: 'app-print-menu',
  templateUrl: './print-menu.component.html',
  styleUrls: ['./print-menu.component.css']
})
export class PrintMenuComponent implements OnInit {

  @Input() m:Menu
  @Input() meals:Meal[]
  @Input() products:Product[]
  @Input() UnitMeasures:UnitMeasure[]
  @Input() category;
  @Input() time;
  @Input() level;
  @Input() count;
  url;
  constructor() { }

  ngOnInit(): void {
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
  // GetAllProducts(){
  //   this.serm.GetMenuProducts(this.m.menuCode).subscribe(succ=>{
  //   this.products=succ
  //  this.GetAllUnitMeasures()   
  //      this.products.forEach(element => {
  //        this.proCalc.push(this.calcAmount(element.amountInMeal))
  //      });
  //   },err=>{console.log(err)})     
  // }
}
