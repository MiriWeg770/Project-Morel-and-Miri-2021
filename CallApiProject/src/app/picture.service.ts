import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Picture } from 'src/Models/Picture';


  
@Injectable({
  providedIn: 'root'
})
export class PictureService {

  PICTURES:Picture[]=[]
  constructor(private http:HttpClient) {
    this.GetAllPictures().subscribe(succ=>{
     this.PICTURES=succ;
    },err=>{console.log(err)})
   }

   AddPicture(p:Picture): Observable<Picture>{
    return this.http.post<Picture>(environment.url +"/api/Picture/AddPicture",p);
  }

  GetPictureById(id:number):Observable<Picture> {
    return this.http.get<Picture>(environment.url +"/api/Picture/"+id);
  }
  GetAllPictures():Observable<Picture[]>{
    return this.http.get<Picture[]>(environment.url +"/api/Picture/");
  }
  DeletePicture(p:Picture):Observable<Picture> {
    return this.http.put<Picture>(environment.url +"/api/Picture/DeletePicture",p);
  }
}
