import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  items: any[] = [];
  title = environment.appTitle;

  constructor(private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.items = this.navigationService.getNavigationItems();
  }

}
