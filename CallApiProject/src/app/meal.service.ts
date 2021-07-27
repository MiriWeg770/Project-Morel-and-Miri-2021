import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal} from 'src/Models/Meal';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http:HttpClient) { }

  GetAllMeals():Observable<Meal[]>{
    return this.http.get<Meal[]>(environment.url +"/api/Meals/GetAllMeals/");
  }
  GetMealById(id:number):Observable<Meal>{
    return this.http.get<Meal>("");
  }
  AddMeal(m:Meal):Observable<Meal> {
    return this.http.post<Meal>(environment.url +"/api/Meals/AddMeal",m);
  }
  DeleteMeal(m:Meal):Observable<Meal> {
    return this.http.put<Meal>(environment.url +"/api/Meals/DeleteMeal",m);
  }
  UpdateMeal(m:Meal):Observable<Meal> {
    return this.http.put<Meal>(environment.url +"/api/Meals/UpdateMeal",m);
  }
  AddMealToUser(m:Meal):Observable<Meal>{
    return this.http.post<Meal>(environment.url +"/api/Meals/AddMealToUser",m);
  }
}
