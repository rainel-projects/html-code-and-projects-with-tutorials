## angular-hooks-visualizer — Data Binding Visualizer

Demonstrates Angular data binding: interpolation `{{}}`, property `[ ]`, event `( )`, and two-way `[(ngModel)]` with simple animations.

### 1) Create project
```bash
ng new angular-hooks-visualizer --standalone --routing=false --style=css
cd angular-hooks-visualizer
```

### 2) Install Tailwind (optional but used here)
```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js` content paths:
```js
content: [
  "./src/**/*.{html,ts}",
]
```

Add Tailwind to `src/styles.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3) Enable animations
```bash
npm i @angular/animations
```

In `src/main.ts` add `provideAnimations()` to the bootstrap providers.

### 4) App component code
Replace `src/app/app.component.ts` and `src/app/app.component.html`.

`src/app/app.component.ts`
```ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('pulse', [
      transition(':increment', [style({ transform: 'scale(1.0)' }), animate('150ms', style({ transform: 'scale(1.06)' })), animate('150ms', style({ transform: 'scale(1.0)' }))]),
      transition(':decrement', [style({ transform: 'scale(1.0)' }), animate('150ms', style({ transform: 'scale(0.94)' })), animate('150ms', style({ transform: 'scale(1.0)' }))])
    ])
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'angular-hooks-visualizer';

  name = signal<string>('Angular');
  changeCount = signal<number>(0);

  uppercaseName = computed(() => this.name().toUpperCase());

  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.name.set(value);
  }

  changeName(): void {
    const next = this.name() === 'Angular' ? 'Ng Dev' : 'Angular';
    this.name.set(next);
    this.changeCount.update(v => v + 1);
  }
}
```

`src/app/app.component.html`
```html
<div class="min-h-screen bg-slate-50 text-slate-900 p-6">
  <h1 class="text-2xl font-bold mb-6">Angular Data Binding Visualizer</h1>

  <div class="grid md:grid-cols-2 gap-6">
    <!-- Two-way binding [(ngModel)] -->
    <div class="bg-white rounded-xl shadow p-5 border border-slate-200">
      <h2 class="font-semibold mb-3">Two-way Binding — [(ngModel)]</h2>
      <input class="w-full border rounded px-3 py-2" [(ngModel)]="name" placeholder="Type your name" />
      <p class="mt-3 text-sm text-slate-600">Model value updates as you type.</p>
    </div>

    <!-- Interpolation {{}} -->
    <div class="bg-white rounded-xl shadow p-5 border border-slate-200">
      <h2 class="font-semibold mb-3">Interpolation — {{'{{ name }}'}}</h2>
      <p class="text-lg" [class]="name() ? 'text-emerald-600' : 'text-rose-600'">Hello {{ name() || '...' }}!</p>
      <p class="text-xs text-slate-500">Uppercase (computed): {{ uppercaseName() }}</p>
    </div>

    <!-- Property Binding [ ] -->
    <div class="bg-white rounded-xl shadow p-5 border border-slate-200">
      <h2 class="font-semibold mb-3">Property Binding — [value]</h2>
      <input class="w-full border rounded px-3 py-2" [value]="name()" (input)="onInput($event)" />
      <p class="mt-3 text-sm text-slate-600">Value flows TS → template.</p>
    </div>

    <!-- Event Binding ( ) -->
    <div class="bg-white rounded-xl shadow p-5 border border-slate-200">
      <h2 class="font-semibold mb-3">Event Binding — (click)</h2>
      <button class="px-4 py-2 rounded bg-indigo-600 text-white" (click)="changeName()">Toggle Name</button>
      <div class="mt-3 text-sm flex items-center gap-2">
        <span>Changes:</span>
        <span [@pulse]="changeCount()" class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white">{{ changeCount() }}</span>
      </div>
    </div>
  </div>

  <hr class="my-6" />
  <pre class="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-auto">
[Type here] --> [(ngModel)] binds here
---------------------------------------
Interpolation: Hello {{'{{ name }}'}}
Property Binding: &lt;input [value]="name"&gt;
Event Binding: (click)="changeName()"
  </pre>
</div>
```

### 5) Run
```bash
npm start
# or
ng serve -o
```

### What to look for
- Typing updates both `[(ngModel)]` and interpolation instantly
- Property binding shows one-way TS → DOM
- Event binding increments counter with a pulse animation


