import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meal} from 'src/Models/Meal';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/Models/Product';
import { CategoriesToMeal } from 'src/Models/CategoriesToMeal';
import { Picture } from 'src/Models/Picture';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  MEALS:Meal[]=[]
  constructor(private http:HttpClient) { }

  GetAllUsersMeals(): Observable<Meal[]>{
    return this.http.get<Meal[]>(environment.url +"/api/Meals/GetAllUsersMeals");
  }
  GetAllMeals():Observable<Meal[]>{
    return this.http.get<Meal[]>(environment.url +"/api/Meals/GetAllMeals/");
  }
  GetMealById(id:number):Observable<Meal>{
    return this.http.get<Meal>(environment.url +"/api/Meals/"+id);
  }
  GetProductsMeal(id:number):Observable<Product[]>{
    return this.http.get<Product[]>(environment.url +"/api/Meals/GetProductsMeal/"+id);
  }
  AddMeal(m:Meal):Observable<Meal> {
    return this.http.post<Meal>(environment.url +"/api/Meals/AddMeal",m);
  }
  DeleteMeal(m:Meal):Observable<Meal> {
    return this.http.put<Meal>(environment.url +"/api/Meals/DeleteMeal",m);
  }
  DeleteMenuMeal(m:Meal):Observable<Meal> {
    return this.http.put<Meal>(environment.url +"/api/Meals/DeleteMenuMeal",m);
  }
  UpdateMeal(m:Meal):Observable<Meal> {
    return this.http.put<Meal>(environment.url +"/api/Meals/UpdateMeal",m);
  }
  AddMealToUser(m:Meal):Observable<Meal>{
    return this.http.post<Meal>(environment.url +"/api/Meals/AddMealToUser",m);
  }
  AddCategoriesToMeal(mc:CategoriesToMeal) {
    return this.http.post(environment.url +"/api/CategoriesToMeal/AddCategoriesToMeal",mc);
  }
  SendMealInMail(from:string, to:string,meal:string ){
    let arr:Object[]=[from,to,meal]
    return this.http.post(environment.url +"/api/Meals/SendMealPDFinMail",arr)  
  }
  MealIsExists(meal:Meal):Observable<boolean>{
    return this.http.put<boolean>(environment.url +"/api/Meals/MealIsExists",meal)  
  }
  checkMealName(m:Meal):Observable<Meal> {
    return this.http.post<Meal>(environment.url +"/api/Meals/checkMealName",m);
  }
  GetAllUsersMealsProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(environment.url +"/api/Meals/GetAllUsersMealsProducts");
  }
  ChangeViewsNumber(m:Meal):Observable<Meal> {
    return this.http.put<Meal>(environment.url +"/api/Meals/ChangeViewsNumber",m);
  }
  AddProduct(p:Product):Observable<Product>{
    return this.http.post<Product>(environment.url +"/api/Meals/AddProduct",p);
  } 
  DeleteProduct(p:Product):Observable<Product>{
    return this.http.put<Product>(environment.url +"/api/Meals/DeleteProduct",p);
  }
}
