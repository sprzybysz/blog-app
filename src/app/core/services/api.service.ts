import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpEvent } from "@angular/common/http"
import { Observable, throwError } from 'rxjs';
import { publishLast, refCount, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  handleErrors(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    return throwError(error)
  }


  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params, headers: new HttpHeaders({ "X-Requested-With": "XMLHttpRequest" }) })
    .pipe(catchError(this.handleErrors), publishLast(), refCount())
  }
}
