import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HookChildComponent } from './hook-child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HookChildComponent],
  templateUrl: './app.html'
})
export class App {
  showChild = signal<boolean>(true);
  value = signal<string>('demo');
}
