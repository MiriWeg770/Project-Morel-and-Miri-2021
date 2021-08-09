import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/Models/Meal';
import { MealService } from '../meal.service';
import { User } from 'src/Models/User';

@Component({
  selector: 'app-show-meal-details',
  templateUrl: './show-meal-details.component.html',
  styleUrls: ['./show-meal-details.component.css']
})
export class ShowMealDetailsComponent implements OnInit {
  meal: Meal = new Meal(null, null, null, null, null, null, null, null, null);
  constructor(private route: ActivatedRoute, private mealServic: MealService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = +params['id'];
      this.mealServic.GetMealById(id).subscribe(dataList => this.meal = dataList);
    }
    );

  }
  close() {
    document.getElementById("send").style.display = "none";
  }
  open() {
    document.getElementById("send").style.display = "block";

  }
}
