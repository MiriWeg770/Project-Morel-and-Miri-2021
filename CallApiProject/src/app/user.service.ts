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

  GetAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(environment.url +"/api/Users");
  }
  GetUserById(id:number):Observable<User> {
    return this.http.get<User>(environment.url +"/api/Users/"+id);
  }
  // AddUser(U:User):Observable<User> {
  //   return this.http.post<User>(environment.url +"/api/Users/add",U);
  // }
  UpdateUser(u: User):Observable<User>  {
    return this.http.post<User>(environment.url + "/api/Users/Update", u);
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
  
  // AddMeal(u:User,m:Meal):Observable<User>{
  //   return this.http.post<User>(environment.url + "/api/Users/AddMeal",u);
  // }
 
  
}
