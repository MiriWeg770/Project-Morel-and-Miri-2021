import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from 'src/Models/Menu';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuCategories } from 'src/Models/MenuCategories';
import { CategoriesToMenu } from 'src/Models/CategoriesToMenu';
import { Meal } from 'src/Models/Meal';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }
  GetAllMenus():Observable<Menu[]>{
    return this.http.get<Menu[]>("");
  }
  GetUserMenus(id:number):Observable<Menu[]>{
    return this.http.get<Menu[]>(environment.url +"/api/Menus/GetAllMenusByIdUser/"+id);
  }
  GetMenuById(id:number):Observable<Menu>{
    return this.http.get<Menu>("");
  }
  AddMenuToUser(m:Menu):Observable<Menu> {
    return this.http.post<Menu>(environment.url +"/api/Menus/AddMenuToUser",m);
  }
  UpdateMenu(m:Menu):Observable<Menu> {
    return this.http.put<Menu>(environment.url +"/api/Menus/UpdateMenu",m);
  }
  DeleteMenu(m:Menu):Observable<Menu> {
    return this.http.put<Menu>(environment.url +"/api/Menus/DeleteMenu",m);
  }
  GetMenuMeals(id:number):Observable<Meal[]>{
    return this.http.get<Meal[]>(environment.url +"/api/Menus/GetMenuMeals/"+id);
  }
  GetAllCategories():Observable<MenuCategories[]>{
    return this.http.get<MenuCategories[]>(environment.url +"/api/MenuCategories/GetAllCategories");
  }
  AddCategoriesToMenu(mc:CategoriesToMenu) {
    return this.http.post(environment.url +"/api/CategoriesToMenu/AddCategoriesToMenu",mc);
  }
}
