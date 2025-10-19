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
  templateUrl: './app.html'
})
export class App {
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
