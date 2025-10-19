## angular-lifecycle-visualizer — Lifecycle Hooks Timeline

A playground to mount/unmount a child component and watch hooks fire with a visual timeline.

### 1) Create project
```bash
ng new angular-lifecycle-visualizer --standalone --routing=false --style=css
cd angular-lifecycle-visualizer
```

### 2) Install Tailwind and animations
```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm i @angular/animations
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

Enable animations in `main.ts` with `provideAnimations()`.

### 3) Child component to visualize hooks

`src/app/hook-child.component.ts`
```ts
import { Component, Input, SimpleChanges, OnChanges, OnInit, DoCheck, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type HookName = 'ngOnChanges'|'ngOnInit'|'ngDoCheck'|'ngAfterViewInit'|'ngOnDestroy';

@Component({
  selector: 'app-hook-child',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-4 rounded border bg-white">
    <div class="font-semibold mb-2">Child input: {{ inputValue }}</div>
    <div class="space-y-2">
      <div *ngFor="let h of timeline(); let i = index" class="flex items-center gap-2">
        <div class="w-36 text-sm">{{ h.name }}</div>
        <div class="flex-1 h-2 bg-slate-200 rounded overflow-hidden">
          <div class="h-2 bg-emerald-500" [style.width.%]="h.progress"></div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class HookChildComponent implements OnChanges, OnInit, DoCheck, AfterViewInit, OnDestroy {
  @Input() inputValue = '';

  timeline = signal<{name: HookName; progress: number;}[]>([
    { name: 'ngOnChanges', progress: 0 },
    { name: 'ngOnInit', progress: 0 },
    { name: 'ngDoCheck', progress: 0 },
    { name: 'ngAfterViewInit', progress: 0 },
    { name: 'ngOnDestroy', progress: 0 },
  ]);

  private mark(name: HookName): void {
    this.timeline.update(list => list.map(step => step.name === name ? { ...step, progress: 100 } : step));
    console.log(`[child] ${name}`);
  }

  ngOnChanges(changes: SimpleChanges): void { this.mark('ngOnChanges'); }
  ngOnInit(): void { this.mark('ngOnInit'); }
  ngDoCheck(): void { this.mark('ngDoCheck'); }
  ngAfterViewInit(): void { this.mark('ngAfterViewInit'); }
  ngOnDestroy(): void { this.mark('ngOnDestroy'); }
}
```

### 4) App component to mount/unmount child

`src/app/app.component.ts`
```ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HookChildComponent } from './hook-child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HookChildComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showChild = signal<boolean>(true);
  value = signal<string>('demo');
}
```

`src/app/app.component.html`
```html
<div class="min-h-screen bg-slate-50 p-6">
  <h1 class="text-2xl font-bold mb-4">Lifecycle Hooks Visualizer</h1>
  <div class="flex items-center gap-3 mb-4">
    <button (click)="showChild.set(!showChild())" class="px-3 py-2 rounded bg-indigo-600 text-white">
      {{ showChild() ? 'Unmount Child' : 'Mount Child' }}
    </button>
    <input [(ngModel)]="value()" (ngModelChange)="value.set($event)" class="border px-3 py-2 rounded" placeholder="Change input" />
  </div>

  <div class="grid md:grid-cols-2 gap-4">
    <div class="bg-white p-4 rounded border">
      <h2 class="font-semibold mb-2">Timeline</h2>
      <app-hook-child *ngIf="showChild()" [inputValue]="value()" />
    </div>
    <div class="bg-white p-4 rounded border">
      <h2 class="font-semibold mb-2">Console Output</h2>
      <p class="text-sm text-slate-600">Open browser console to watch hook logs.</p>
      <pre class="text-xs">[ngOnChanges] → [ngOnInit] → [ngDoCheck] → [ngAfterViewInit]\nDestroy → [ngOnDestroy]</pre>
    </div>
  </div>
</div>
```

### 5) Run
```bash
ng serve -o
```

Change the input, mount/unmount the child, and observe the timeline and console logs.


