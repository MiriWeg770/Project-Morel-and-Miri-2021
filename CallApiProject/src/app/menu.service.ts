import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from 'src/Models/Menu';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuCategories } from 'src/Models/MenuCategories';
import { CategoriesToMenu } from 'src/Models/CategoriesToMenu';
import { Meal } from 'src/Models/Meal';
import { Product } from 'src/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }
  GetAllUsersMenus(): Observable<Menu[]>{
    return this.http.get<Menu[]>(environment.url +"/api/Menus/GetAllUsersMenus");
  }
  GetAllMenus():Observable<Menu[]>{
    return this.http.get<Menu[]>(environment.url +"/api/Menus");
  }
  GetUserMenus(id:number):Observable<Menu[]>{
    return this.http.get<Menu[]>(environment.url +"/api/Menus/GetAllMenusByIdUser/"+id);
  }
  GetMenuById(id:number):Observable<Menu>{
    return this.http.get<Menu>(environment.url +"/api/Menus/"+id);
  }
  AddMenuToUser(m:Menu):Observable<Menu> {
    return this.http.post<Menu>(environment.url +"/api/Menus/AddMenuToUser",m);
  }
  UpdateMenu(m:Menu):Observable<Menu> {
    return this.http.put<Menu>(environment.url +"/api/Menus/UpdateMenu",m);
  } 
  PublishMenu(m:Menu):Observable<Menu> {
    return this.http.put<Menu>(environment.url +"/api/Menus/PublishMenu",m);
  } 
  ChangeViewsNumber(m:Menu):Observable<Menu> {
    return this.http.put<Menu>(environment.url +"/api/Menus/ChangeViewsNumber",m);
  }
  DeleteMenu(m:Menu):Observable<Menu> {
    return this.http.put<Menu>(environment.url +"/api/Menus/DeleteMenu",m);
  }
  GetMenuMeals(id:number):Observable<Meal[]>{
    return this.http.get<Meal[]>(environment.url +"/api/Menus/GetMenuMeals/"+id);
  }
  GetMenuProducts(id:number):Observable<Product[]>{
    return this.http.get<Product[]>(environment.url +"/api/Menus/GetMenuProducts/"+id);
  }
  GetAllCategories():Observable<MenuCategories[]>{
    return this.http.get<MenuCategories[]>(environment.url +"/api/MenuCategories");
  }
  AddCategoriesToMenu(mc:CategoriesToMenu) {
    return this.http.post(environment.url +"/api/CategoriesToMenu/AddCategoriesToMenu",mc);
  }
  GetCategoryById(id:number):Observable<MenuCategories>{
    return this.http.get<MenuCategories>(environment.url +"/api/MenuCategories/"+id);
  }
  MenuIsExists(menu:Menu):Observable<boolean>{
    return this.http.put<boolean>(environment.url +"/api/Menus/MenuIsExists",menu)  
  }
  AddMenuCategory(m:MenuCategories){
    return this.http.post<MenuCategories>(environment.url+"/api/MenuCategories/AddMenuCategory",m)
  }
  DeleteMenuCategory(m:MenuCategories){
    return this.http.put<MenuCategories>(environment.url+"/api/MenuCategories/DeleteMenuCategory",m)
  } 
  UpdateMenuCategory(m:MenuCategories){
    return this.http.put<MenuCategories>(environment.url+"/api/MenuCategories/UpdateMenuCategory",m)
  }
  SendMenuInMail(from:string, to:string,menu:string ){
    let arr:Object[]=[from,to,menu]
    return this.http.post(environment.url +"/api/Menus/SendMenuPDFinMail",arr)  
  }
}
