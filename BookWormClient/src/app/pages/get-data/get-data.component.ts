import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GoogleBookModel } from 'src/app/models/GoogleBook';
import { GoogleBooksService } from 'src/app/services/google-books.service';
import { NotificationService } from 'src/app/services/notification.service';

enum Language {
  English = 'en',
  German = 'de',
  French = 'fr',
  Spanish = 'es',
  Italian = 'it',
  Hungarian = 'hu'
}

interface BookElement {
  book: GoogleBookModel;
  checked: boolean;
}

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent {
  bookElements: BookElement[];

  queryText: string;
  queryLang: string;
  queryPage: number;

  languages = Language;
  languageEntries = Object.entries(this.languages).map((([key, value]) => ({ name:key,value:value })))

  constructor(private googleBooksService: GoogleBooksService, private notificationService: NotificationService) {
    console.log(this.languageEntries);

  }

  bookChecked(event: MatCheckboxChange, bookElement: BookElement) {
    bookElement.checked = event.checked;
  }

  selectAllBooks(event: MatCheckboxChange) {
    this.bookElements.forEach((e) => {
      e.checked = event.checked;
    });
  }

  saveBooks() {
    console.log(this.bookElements.filter(e => !e.book.volumeInfo?.publisher));

    this.googleBooksService.saveGoogleBooks(this.bookElements.filter(e => e.checked).map(e => e.book)).subscribe(response => {
      console.log(response);
      this.notificationService.openSnackBar("Books saved");

    })
  }

  queryBooks() {
    this.googleBooksService.getGoogleBooks(this.queryText, this.queryPage, this.queryLang).subscribe(booksResponse => {
      this.bookElements = booksResponse.items.map((item) => {
        return {
          book: item,
          checked: false
        }
      });
    })
  }
}
