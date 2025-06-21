import { Injectable } from '@angular/core';
import { BreadcrumbItem } from '../interfaces/breadcrumb.interface';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Breadcrumb {
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbItem[]>([]);
  private pageTitleSubject = new BehaviorSubject<string>('');

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateBreadcrumbs();
      });
  }

  get breadcrumbs$(): Observable<BreadcrumbItem[]> {
    return this.breadcrumbSubject.asObservable();
  }

  get pageTitle$(): Observable<string> {
    return this.pageTitleSubject.asObservable();
  }

  private updateBreadcrumbs(): void {
    const breadcrumbs = this.getBreadcrumbItems();
    const pageTitle = this.getPageTitle();

    this.breadcrumbSubject.next(breadcrumbs);
    this.pageTitleSubject.next(pageTitle);
  }

  private getPageTitle(): string {
    let route = this.activatedRoute.snapshot;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.data['title'] || '';
  }

  private getBreadcrumbItems(): BreadcrumbItem[] {
    const breadcrumbItems: BreadcrumbItem[] = [];
    let route: ActivatedRouteSnapshot | null = this.activatedRoute.snapshot;
    let url = '';

    while (route) {
      if (route.url.length > 0) {
        url += '/' + route.url.map((segment) => segment.path).join('/');
      }

      if (route.data['breadcrumb']) {
        const label = route.data['breadcrumb'];
        const shouldExclude = (label.match(/-/g) || []).length >= 3;

        if (!shouldExclude) {
          breadcrumbItems.push({
            label: label,
            url: url,
            isClickable: true,
          });
        }
      }

      route = route.firstChild;
    }

    return breadcrumbItems;
  }

  navigateTo(item: BreadcrumbItem): void {
    if (item.isClickable && item.url) {
      this.router.navigate([item.url]);
    }
  }
}
