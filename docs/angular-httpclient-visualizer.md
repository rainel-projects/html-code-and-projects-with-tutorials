## angular-httpclient-visualizer — HTTPClient Flow UI

Visualizes GET/POST/PUT/DELETE requests with a flow: Component → Service → API → Response, plus retry on error.

### 1) Create project
```bash
ng new angular-httpclient-visualizer --standalone --routing=false --style=css
cd angular-httpclient-visualizer
```

### 2) Install Tailwind and HttpClient
```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`
```js
content: ["./src/**/*.{html,ts}"]
```

`src/styles.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Enable HttpClient in `main.ts`:
```ts
import { provideHttpClient } from '@angular/common/http';
// add provideHttpClient() in bootstrapApplication providers
```

### 3) Service
`src/app/api.service.ts`
```ts
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
```

### 4) App component
`src/app/app.component.ts`
```ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { catchError, delay, of, retry } from 'rxjs';

type Method = 'GET'|'POST'|'PUT'|'DELETE';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
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
```

`src/app/app.component.html`
```html
<div class="min-h-screen bg-slate-50 p-6">
  <h1 class="text-2xl font-bold mb-4">HTTPClient Visualizer</h1>

  <div class="flex flex-wrap gap-3 mb-4">
    <button class="px-3 py-2 rounded bg-emerald-600 text-white" (click)="call('GET')">GET</button>
    <button class="px-3 py-2 rounded bg-amber-600 text-white" (click)="call('POST')">POST</button>
    <button class="px-3 py-2 rounded bg-blue-600 text-white" (click)="call('PUT')">PUT</button>
    <button class="px-3 py-2 rounded bg-rose-600 text-white" (click)="call('DELETE')">DELETE</button>
  </div>

  <div class="grid md:grid-cols-2 gap-4">
    <div class="bg-white p-4 rounded border">
      <h2 class="font-semibold mb-2">Flow</h2>
      <pre class="text-sm">[{{ activeMethod() || '...' }}] ---> [SERVICE] ---> [API] ---> [RESPONSE]</pre>
      <div *ngIf="loading()" class="mt-3 text-sm text-slate-600">Loading...</div>
      <div *ngIf="error()" class="mt-3 text-sm text-rose-600">{{ error() }}</div>
    </div>
    <div class="bg-white p-4 rounded border">
      <h2 class="font-semibold mb-2">Response</h2>
      <pre class="text-xs overflow-auto">{{ response() | json }}</pre>
    </div>
  </div>
</div>
```

### 5) Run
```bash
ng serve -o
```

Try methods, observe color-coding and response. Force network offline to see retry/error.


