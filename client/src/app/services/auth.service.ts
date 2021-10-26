import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser?: User;

  constructor(private httpClient: HttpClient) {}

  private set _jwt(token: string | undefined) {
    if (token) {
      window.localStorage.setItem(environment.STORAGE_KEYS.JWT, token); // no need to stringify, jwt is a string
    }
  }

  private get _jwt(): string | undefined {
    return (
      window.localStorage.getItem(environment.STORAGE_KEYS.JWT) || undefined
    );
  }

  register(val: any): Observable<String> {
    console.log(val);

    return this.httpClient.post<String>(
      `${environment.api}/auth/register`,
      { form: { user: val.email, pass: val.pass } },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    ).pipe(
      tap((res) => res),
      map((res) => res)
    );
  }

  login(val: any): Observable<Boolean> {
    return this.httpClient
      .post<any>(
        `${environment.api}/auth/login`,
        { form: { user: val.email, pass: val.pass } },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(
        tap((res) => (this._jwt = res.token)),
        map((res) => !!res.token)
      );
  }

  isLoggeddIn(): Observable<boolean> {
    return of(!!this._jwt);
  }

  // signin(email: string, password: string): Observable<boolean> {
  signin(val: string): Observable<boolean> {
    // const body = { user: email, pass: password };

    return this.httpClient
      .post(`${environment.api}/auth/signin`, val, {
        headers: {
          'content-type': 'application/json',
        },
        responseType: 'text',
      })
      .pipe(
        tap((res) => (this._jwt = res)),
        map((res) => !!res)
      );
  }

  signout(): Observable<{}> {
    // this._currentUser = undefined;
    return of({});
  }

  currentUser(): Observable<User | undefined> {
    return of(this._currentUser);
  }
}




