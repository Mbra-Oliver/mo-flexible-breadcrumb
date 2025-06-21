import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BreadcrumbItem } from './interfaces/breadcrumb.interface';
import { Breadcrumb } from './services/breadcrumb';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-mo-breadcumb-manager',
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-1">
      <nav class="flex flex-col" aria-label="Breadcrumb">
        @if (pageTitle) {
        <p class="text-sm md:text-xl font-bold my-2">{{ pageTitle }}</p>
        }
        <ol
          class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
        >
          @for (item of breadcrumbItems; track $index; let first = $first; let
          last = $last) {
          <li class="inline-flex items-center text-xs">
            <span
              class="inline-flex items-center transition-colors duration-200"
              [ngClass]="{
                '!text-primary cursor-pointer hover:text-primary-dark':
                  first && item.isClickable,
                'text-gray-600 cursor-pointer hover:text-gray-800':
                  !first && item.isClickable && !last,
                'text-black font-semibold cursor-default':
                  !item.isClickable || last
              }"
              (click)="onBreadcrumbClick(item)"
            >
              {{ item.label }}
            </span>
            @if (!last) {
            <svg
              class="rtl:rotate-180 w-2 h-2 text-gray-700 mx-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            }
          </li>
          }
        </ol>
      </nav>
    </div>
  `,
  styles: ``,
})
export class MoBreadcumbManager implements OnInit, OnDestroy {
  breadcrumbItems: BreadcrumbItem[] = [];
  pageTitle: string = '';
  private destroy$ = new Subject<void>();

  constructor(private breadcrumbService: Breadcrumb) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$
      .pipe(takeUntil(this.destroy$))
      .subscribe((items) => (this.breadcrumbItems = items));

    this.breadcrumbService.pageTitle$
      .pipe(takeUntil(this.destroy$))
      .subscribe((title) => (this.pageTitle = title));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onBreadcrumbClick(item: BreadcrumbItem): void {
    this.breadcrumbService.navigateTo(item);
  }
}
