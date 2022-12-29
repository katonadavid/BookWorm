import { Injectable } from '@angular/core';

export interface NavigationItem {
  label: string;
  routerLink: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private navigationItems: NavigationItem[] = [
    {
      label: 'Home',
      routerLink: '/home',
      icon: 'home'
    },
    {
      label: 'Publications',
      routerLink: '/publications',
      icon: 'book'
    },
    {
      label: 'Authors',
      routerLink: '/authors',
      icon: 'attribution'
    },
    {
      label: 'Get Data',
      routerLink: '/get-data',
      icon: 'storage'
    }
  ];

  constructor() { }

  getNavigationItems(): any[] {
    return this.navigationItems;
  }
}
