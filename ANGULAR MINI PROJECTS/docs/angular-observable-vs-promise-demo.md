## angular-observable-vs-promise-demo — Async Side-by-Side

Compare Promise (single resolve) vs Observable (stream of values) with animated timelines.

### 1) Create project
```bash
ng new angular-observable-vs-promise-demo --standalone --routing=false --style=css
cd angular-observable-vs-promise-demo
```

### 2) Tailwind (optional)
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

### 3) App component
`src/app/app.component.ts`
```ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, take } from 'rxjs';

type Point = { t: number; label: string };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  now = () => performance.now();
  startTs = signal<number>(this.now());

  promisePoints = signal<Point[]>([]);
  observablePoints = signal<Point[]>([]);

  start(): void {
    this.startTs.set(this.now());
    this.promisePoints.set([]);
    this.observablePoints.set([]);

    // Promise resolves once at ~1200ms
    new Promise<string>(resolve => setTimeout(() => resolve('resolved'), 1200))
      .then(v => this.pushPoint(this.promisePoints, v));

    // Observable emits every 400ms, 5 times
    interval(400).pipe(take(5)).subscribe(i => this.pushPoint(this.observablePoints, `emit ${i+1}`));
  }

  private pushPoint(store: (v?: any) => any, label: string): void {
    const t = Math.round(this.now() - this.startTs());
    store((arr: Point[]) => [...arr, { t, label }]);
  }

  maxT = computed(() => {
    const all = [...this.promisePoints(), ...this.observablePoints()];
    return all.length ? Math.max(...all.map(p => p.t)) : 1600;
  });
}
```

`src/app/app.component.html`
```html
<div class="min-h-screen bg-slate-50 p-6">
  <h1 class="text-2xl font-bold mb-4">Observable vs Promise</h1>
  <button (click)="start()" class="px-3 py-2 rounded bg-indigo-600 text-white mb-4">Start</button>

  <div class="grid md:grid-cols-2 gap-6">
    <div class="bg-white p-4 rounded border">
      <h2 class="font-semibold mb-2">Promise (one-time)</h2>
      <div class="h-24 relative bg-slate-100 rounded">
        <div *ngFor="let p of promisePoints(); let i = index" class="absolute top-8 -translate-x-1/2">
          <div class="w-2 h-2 rounded-full bg-blue-600" [style.left.px]="(p.t / maxT()) * 260 + 16"></div>
          <div class="text-xs mt-1" [style.left.px]="(p.t / maxT()) * 260 + 8">{{ p.label }} ({{ p.t }}ms)</div>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 rounded border">
      <h2 class="font-semibold mb-2">Observable (stream)</h2>
      <div class="h-24 relative bg-slate-100 rounded">
        <div *ngFor="let p of observablePoints(); let i = index" class="absolute top-8 -translate-x-1/2">
          <div class="w-2 h-2 rounded-full bg-emerald-600" [style.left.px]="(p.t / maxT()) * 260 + 16"></div>
          <div class="text-xs mt-1" [style.left.px]="(p.t / maxT()) * 260 + 8">{{ p.label }} ({{ p.t }}ms)</div>
        </div>
      </div>
    </div>
  </div>

  <pre class="mt-4 text-sm">Promise: [Emit 🔵------------Completed]\nObservable: [Emit 🔵🔵🔵🔵🔵 ...]</pre>
</div>
```

### 4) Run
```bash
ng serve -o
```

Hit Start and watch the dots appear: once for Promise, multiple for Observable.


