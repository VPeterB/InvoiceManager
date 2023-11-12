import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:8080/api";
  }

  getAll(uri: string): Observable<any[]>{
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`);
  }

  get(uri: string): Observable<any>{
    return this.http.get<any>(`${this.ROOT_URL}/${uri}`);
  }

  delete(uri: string): Observable<any>{
    return this.http.delete<any>(`${this.ROOT_URL}/${uri}`);
  }

  put(uri: string, body: any): Observable<any>{
   return this.http.put<any>(`${this.ROOT_URL}/${uri}`, body);
  }

  post(uri: string, body: any): Observable<any>{
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, body);
  }
}
