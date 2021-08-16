import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from 'src/Models/Menu';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  GetAllMenus(id:number):Observable<Menu[]>{
    return this.http.get<Menu[]>("");
  }
  GetMenuById(id:number):Observable<Menu>{
    return this.http.get<Menu>("");
  }
  AddMenu(m:Menu):Observable<Menu> {
    return this.http.post<Menu>(environment.url +"/api/Menu/AddMenu",m);
  }
  
}
