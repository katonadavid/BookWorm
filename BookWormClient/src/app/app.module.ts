import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicationsComponent } from './pages/publications/publications.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthorsComponent } from './pages/authors/authors.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublicationsComponent,
    NavigationBarComponent,
    AppShellComponent,
    FooterComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TabMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
