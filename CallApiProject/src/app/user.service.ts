import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from 'src/Models/User';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  AddUser(U:User):Observable<User> {
    return this.http.post<User>(environment.url +"/api/Users",U);
  }
  SignIn(u: User):Observable<User> {
    return this.http.post<User>(environment.url + "/api/Users/SignIn", u);
  }
  SignUp(u: User):Observable<User>  {
    return this.http.post<User>(environment.url + "/api/Users/SignUp", u);
  }
  
}
