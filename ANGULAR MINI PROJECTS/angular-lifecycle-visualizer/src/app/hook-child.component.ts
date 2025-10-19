import { Component, Input, SimpleChanges, OnChanges, OnInit, DoCheck, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type HookName = 'ngOnChanges'|'ngOnInit'|'ngDoCheck'|'ngAfterViewInit'|'ngOnDestroy';

@Component({
  selector: 'app-hook-child',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="timeline-card">
    <div class="font-semibold mb-2">Child Component Input: <span class="text-emerald-400">{{ inputValue }}</span></div>
    <div class="hook-timeline">
      <div *ngFor="let h of timeline(); let i = index" class="hook-item" [class.active]="h.progress === 100">
        <div class="hook-name">{{ h.name }}</div>
        <div class="hook-progress">
          <div class="hook-progress-bar" [style.width.%]="h.progress"></div>
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
