import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal} from 'src/Models/Meal';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url=environment.url+"meals/"
@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http:HttpClient) { }

  GetAllMeals():Observable<Meal[]>{
    return this.http.get<Meal[]>(url+"GetAllMeals");
  }
  GetMealById(id:number):Observable<Meal>{
    return this.http.get<Meal>("");

  }
}
