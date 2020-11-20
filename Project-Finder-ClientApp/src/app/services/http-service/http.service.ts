import { environment } from '../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.url;
  }

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/${endpoint}`);
  }

  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${endpoint}/${id}`);
  }

  post<T>(endpoint: string, item: T): Observable<any> {
    const header = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    const body = JSON.stringify(item);
    return this.httpClient.post<any>(`${this.url}/${endpoint}`, body, {
      headers: header,
    });
  }

  update<T>(endpoint: string, item: T): Observable<T> {
    const header = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    const body = JSON.stringify(item);
    return this.httpClient.put<T>(`${this.url}/${endpoint}`, body, {
      headers: header,
    });
  }

  patch<T>(endpoint: string, item: T): Observable<T> {
    const header = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    const body = JSON.stringify(item);
    return this.httpClient.patch<T>(`${this.url}/${endpoint}`, body, {
      headers: header,
    });
  }

  deleteById<T>(endpoint: string, id: number): Observable<object> {
    return this.httpClient.delete(`${this.url}/${endpoint}/${id}`);
  }
}
