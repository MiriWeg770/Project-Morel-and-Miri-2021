import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/Models/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Meal } from 'src/Models/Meal';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User = new User(0, null, null, null);
  constructor(private http: HttpClient) { }

  GetAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.url + "/api/Users");
  }
  GetUserById(id: number): Observable<User> {
    return this.http.get<User>(environment.url + "/api/Users/" + id);
  }
  // AddUser(U:User):Observable<User> {
  //   return this.http.post<User>(environment.url +"/api/Users/add",U);
  // }
  SignIn(u: User): Observable<User> {
    return this.http.post<User>(environment.url + "/api/Users/SignIn", u);
  }
  SignUp(u: User): Observable<User> {
    return this.http.post<User>(environment.url + "/api/Users/SignUp", u);
  }
  GetUserMeals(id: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(environment.url + "/api/Meals/GetUserMeals/" + id);
  }
  // AddMeal(u:User,m:Meal):Observable<User>{
  //   return this.http.post<User>(environment.url + "/api/Users/AddMeal",u);
  // }

}
