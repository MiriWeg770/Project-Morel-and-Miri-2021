import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Level } from 'src/Models/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http:HttpClient) { }

  GetAllLevels():Observable<Level[]>{
    return this.http.get<Level[]>(environment.url +"/api/Level");
  }
  GetLevelById(id:number):Observable<Level>{
    return this.http.get<Level>(environment.url +"/api/Level/"+id);
  }
}
