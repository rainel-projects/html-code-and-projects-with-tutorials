import { Component, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, take } from 'rxjs';

type Point = { t: number; label: string };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html'
})
export class App {
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

  private pushPoint(store: WritableSignal<Point[]>, label: string): void {
    const t = Math.round(this.now() - this.startTs());
    store.update((arr: Point[]) => [...arr, { t, label }]);
  }

  maxT = computed(() => {
    const all = [...this.promisePoints(), ...this.observablePoints()];
    return all.length ? Math.max(...all.map(p => p.t)) : 1600;
  });
}
