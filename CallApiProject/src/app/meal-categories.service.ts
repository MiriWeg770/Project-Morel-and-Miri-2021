import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MealCategories } from 'src/Models/MealCategories';

@Injectable({
  providedIn: 'root'
})
export class MealCategoriesService {
  checkListCategories:MealCategories[]=[];
  
  constructor(private http:HttpClient) { }

  GetAllCategories():Observable<MealCategories[]>{
    return this.http.get<MealCategories[]>(environment.url +"/api/MealCategories");
  }
  GetCategoryById(id:number):Observable<MealCategories>{
    return this.http.get<MealCategories>(environment.url +"/api/MealCategories/"+id);
  }
  AddMealCategory(m:MealCategories){
    return this.http.post<MealCategories>(environment.url+"/api/MealCategories/AddMealCategory",m)
  }
  DeleteMealCategory(m:MealCategories){
    return this.http.put<MealCategories>(environment.url+"/api/MealCategories/DeleteMealCategory",m)
  }
}
