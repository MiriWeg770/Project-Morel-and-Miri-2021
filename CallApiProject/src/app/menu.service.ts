import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from 'src/Models/Menu';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuCategories } from 'src/Models/MenuCategories';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }
  GetAllMenus():Observable<Menu[]>{
    return this.http.get<Menu[]>("");
  }
  GetAllMenusByIdUser(id:number):Observable<Menu[]>{
    return this.http.get<Menu[]>(environment.url +"/api/Menus/GetAllMenusByIdUser"+id);
  }
  GetMenuById(id:number):Observable<Menu>{
    return this.http.get<Menu>("");
  }
  AddMenu(m:Menu):Observable<Menu> {
    return this.http.post<Menu>(environment.url +"/api/Menus/AddMenu",m);
  }
  
  GetAllCategories():Observable<MenuCategories[]>{
    return this.http.get<MenuCategories[]>(environment.url +"/api/MenuCategories/GetAllCategories");
  }
}
