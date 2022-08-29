import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: '/home',
        icon: 'pi pi-home'
      },
      {
        label: 'Publications',
        routerLink: '/publications',
        icon: 'pi pi-book'
      },
      {
        label: 'Authors',
        routerLink: '/authors',
        icon: 'pi pi-pencil'
      }
    ];
  }

}
