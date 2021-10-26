import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { cart } from '../models/cart';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  addItem(fd: FormData): Observable<any> {
    return this.http.post('http://127.0.0.1:14700/admin/additem', fd); // content type form data will be set automatically
  }

  getItems(): Observable<any> {
    return this.http.get('http://127.0.0.1:14700/admin/getitems');
  }

  deleteItem(obj: Object): Observable<any> {
    return this.http.post('http://127.0.0.1:14700/admin/deleteitem', {
      obj,
    }); // content type form data will be set automatically
  }

  updateItem(fd: FormData): Observable<any> {
    return this.http.post('http://127.0.0.1:14700/admin/updateitem', fd); // content type form data will be set automatically
  }
}
