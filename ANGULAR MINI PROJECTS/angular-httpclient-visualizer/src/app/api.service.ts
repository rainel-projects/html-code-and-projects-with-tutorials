import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> { return this.http.get(this.base); }
  createUser(payload: any): Observable<any> { return this.http.post(this.base, payload); }
  updateUser(id: number, payload: any): Observable<any> { return this.http.put(`${this.base}/${id}`, payload); }
  deleteUser(id: number): Observable<any> { return this.http.delete(`${this.base}/${id}`); }
}
