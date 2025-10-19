## angular-forms-comparison-demo — Template vs Reactive Forms

Side-by-side forms showing values, validity, and control state (touched/dirty) in real time.

### 1) Create project
```bash
ng new angular-forms-comparison-demo --standalone --routing=false --style=css
cd angular-forms-comparison-demo
```

### 2) Tailwind and Forms
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

Enable forms in `main.ts` providers or import into component: `import { FormsModule, ReactiveFormsModule } from '@angular/forms';`

### 3) App component
`src/app/app.component.ts`
```ts
import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Template-driven model
  user = { name: '', email: '' };

  // Reactive form
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder) {}
}
```

`src/app/app.component.html`
```html
<div class="min-h-screen bg-slate-50 p-6">
  <h1 class="text-2xl font-bold mb-4">Forms Comparison</h1>
  <div class="grid md:grid-cols-2 gap-6">
    <!-- Template-driven -->
    <div class="bg-white p-4 rounded border">
      <h2 class="font-semibold mb-3">Template-driven</h2>
      <form #f="ngForm" novalidate>
        <label class="block mb-2 text-sm">Name</label>
        <input name="name" [(ngModel)]="user.name" #name="ngModel" required minlength="2" class="w-full border rounded px-3 py-2" />
        <div class="text-xs text-rose-600 mt-1" *ngIf="name.invalid && (name.dirty || name.touched)">
          Name is required (min 2 chars)
        </div>

        <label class="block mt-3 mb-2 text-sm">Email</label>
        <input name="email" [(ngModel)]="user.email" #email="ngModel" required email class="w-full border rounded px-3 py-2" />
        <div class="text-xs text-rose-600 mt-1" *ngIf="email.invalid && (email.dirty || email.touched)">
          Valid email is required
        </div>
      </form>

      <div class="mt-4 text-xs">
        <div>Value: {{ user | json }}</div>
        <div>Valid: {{ f.valid }}</div>
        <div>Touched: {{ f.touched }}</div>
        <div>Dirty: {{ f.dirty }}</div>
      </div>
    </div>

    <!-- Reactive -->
    <div class="bg-white p-4 rounded border">
      <h2 class="font-semibold mb-3">Reactive</h2>
      <form [formGroup]="form" novalidate>
        <label class="block mb-2 text-sm">Name</label>
        <input formControlName="name" class="w-full border rounded px-3 py-2" />
        <div class="text-xs text-rose-600 mt-1" *ngIf="form.get('name')?.invalid && (form.get('name')?.dirty || form.get('name')?.touched)">
          Name is required (min 2 chars)
        </div>

        <label class="block mt-3 mb-2 text-sm">Email</label>
        <input formControlName="email" class="w-full border rounded px-3 py-2" />
        <div class="text-xs text-rose-600 mt-1" *ngIf="form.get('email')?.invalid && (form.get('email')?.dirty || form.get('email')?.touched)">
          Valid email is required
        </div>
      </form>

      <div class="mt-4 text-xs">
        <div>Value: {{ form.value | json }}</div>
        <div>Valid: {{ form.valid }}</div>
        <div>Touched: {{ form.touched }}</div>
        <div>Dirty: {{ form.dirty }}</div>
      </div>
    </div>
  </div>

  <pre class="mt-6 text-sm">Template Form     | Reactive Form\n-----------------------------------------\nValue: {...}      | Value: {...}\nValid: true       | Valid: false\nTouched: false    | Touched: true</pre>
</div>
```

### 4) Run
```bash
ng serve -o
```

Interact with both forms and watch state and validation update live.


