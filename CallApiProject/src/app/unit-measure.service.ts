import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnitMeasure } from 'src/Models/UnitMeasure';


@Injectable({
  providedIn: 'root'
})
export class UnitMeasureService {

  constructor(private http:HttpClient) { }

  GetAllUnitMeasures():Observable<UnitMeasure[]>{
    return this.http.get<UnitMeasure[]>(environment.url +"/api/UnitMeasure");
  }
}
