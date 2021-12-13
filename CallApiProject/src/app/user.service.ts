import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User} from 'src/Models/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meal } from 'src/Models/Meal';
import { Menu } from 'src/Models/Menu';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  user:User=new User(null,null,null,null,null,null)
  GetAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(environment.url +"/api/Users");
  }
  GetUserById(id:number):Observable<User> {
    return this.http.get<User>(environment.url +"/api/Users/"+id);
  }
  DeletUser(U:User):Observable<User> {
    return this.http.put<User>(environment.url +"/api/Users/DeletUser",U);
  }
  UpdateUser(u: User):Observable<User>  {
    return this.http.post<User>(environment.url + "/api/Users/Update", u);
  }
  IsManager(u: User):Observable<boolean> {
    return this.http.put<boolean>(environment.url + "/api/Users/IsManager", u);
  }
  SignIn(u: User):Observable<User> {
    return this.http.post<User>(environment.url + "/api/Users/SignIn", u);
  }
  SignUp(u: User):Observable<User>  {
    return this.http.post<User>(environment.url + "/api/Users/SignUp", u);
  }
  GetUserMeals(id:number): Observable<Meal[]>{
    return this.http.get<Meal[]>(environment.url +"/api/Meals/GetUserMeals/"+id);
  }
  GetUserMenus(id:number): Observable<Menu[]>{
    return this.http.get<Menu[]>(environment.url +"/api/Menus/GetUserMenus/"+id);
  }
  sendMail(u:User): Observable<User>{
    return this.http.post<User>(environment.url +"/api/Users/SendMail",u)  
  }
  sendMessage(m:string,s:string, u:string): Observable<User>{
    let arr:string[]=[m,s,u]
    return this.http.post<User>(environment.url +"/api/Users/SendMessage",arr)  
  }

  
}
