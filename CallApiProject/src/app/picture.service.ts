import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Picture } from 'src/Models/Picture';


  
@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private http:HttpClient) { }
  uploadFile(theFile: Picture) : Observable<Picture> {
    return this.http.post<Picture>(environment.url+"/api/Picture/", theFile);
}

}
