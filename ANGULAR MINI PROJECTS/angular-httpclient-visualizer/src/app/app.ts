import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { catchError, delay, of, retry } from 'rxjs';

type Method = 'GET'|'POST'|'PUT'|'DELETE';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html'
})
export class App {
  loading = signal<boolean>(false);
  activeMethod = signal<Method|undefined>(undefined);
  response = signal<any>(null);
  error = signal<string>('');

  constructor(private api: ApiService) {}

  call(method: Method): void {
    this.activeMethod.set(method);
    this.loading.set(true);
    this.response.set(null);
    this.error.set('');

    let obs;
    switch (method) {
      case 'GET': obs = this.api.getUsers(); break;
      case 'POST': obs = this.api.createUser({ name: 'New User' }); break;
      case 'PUT': obs = this.api.updateUser(1, { name: 'Updated User' }); break;
      case 'DELETE': obs = this.api.deleteUser(1); break;
    }

    obs!.pipe(
      delay(400),
      retry(1),
      catchError(err => {
        this.error.set('Request failed. Try again.');
        return of(null);
      })
    ).subscribe(res => {
      this.response.set(res);
      this.loading.set(false);
    });
  }
}
