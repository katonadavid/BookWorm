import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private navigationItems: MenuItem[] = [
    {
      label: 'Home',
      routerLink: '/home'
    },
    {
      label: 'Publications',
      routerLink: '/publications'
    }
  ];

  constructor() { }

  getNavigationItems(): MenuItem[] {
    return this.navigationItems;
  }
}
