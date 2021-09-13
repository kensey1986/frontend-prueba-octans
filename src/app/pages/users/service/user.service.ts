import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlEndPoint: string = 'http://localhost:8080/api/users';

  constructor(
    public  http
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    : HttpClient,
    public  router: Router,
  ) { }

  getListadoUsuarios(): Observable<User[]> {
   
    return this.http.get<User[]>( `${this.urlEndPoint}`).pipe(
      catchError (e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/users']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
  getUser(id: any): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/${id}`).pipe(
      catchError (e => {
        if (e.status !== 401 && e.error.mensaje) {
          this.router.navigate(['/users']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<User> {
    console.log('llego al servicio');
    return this.http.delete(
      `${this.urlEndPoint}/${id}`).pipe(
        map((response: any ) => response.user as User ),
        catchError (e => {
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      );
  }
}
