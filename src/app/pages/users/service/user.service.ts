import { User } from './../interface/user';
import { Rol } from './../interface/rol';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public urlEndPoint: string = 'http://localhost:8080/api/users';

  constructor(
    public  http : HttpClient,
    public  router: Router,
  ) { }

  /**
   * 
   * @returns un listado de Roles desde la db
   */
  getListadoRoles(): Observable<Rol[]> {
    console.log('====================================');
    console.log('llego a llamar los roles');
    console.log('====================================');
    return this.http.get<Rol[]>( 'http://localhost:8080/api/roles').pipe(
      catchError (e => {
        if (e.status !== 401 && e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

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

  create(user: User): Observable<User> {
    return this.http.post<User>(this.urlEndPoint, user).pipe(
       map((response: any ) => response.user as User ),
       catchError (e => {
         if (e.status === 400) {
           return throwError(e);
         }
         if (e.error.mensaje) {
           console.log(e.error);
           console.log(e.error.mensaje);
           const prueba = (e.error.dato);
           const tmp = prueba.split(`'`);
           Swal.fire(`${tmp[1]}`, `Ya existe un registro Con este dato`, 'error')
         }
         return throwError(e);
       })
     );
   }

  delete(id: any): Observable<any> {
    return this.http.delete(
      `${this.urlEndPoint}/${id}`)
  }
}
