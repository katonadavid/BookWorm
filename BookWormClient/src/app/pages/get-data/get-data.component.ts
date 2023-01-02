import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { GoogleBookModel } from 'src/app/models/GoogleBook';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent {
  books: GoogleBookModel[] = [];
  selectedBooks: GoogleBookModel[] = [];

  queryText: string;
  queryPage: number;

  constructor(private dataService: DataService) {}

  bookChecked(event: MatCheckboxChange, book: GoogleBookModel) {
    if (event.checked) {
      console.log(book.id);
      this.selectedBooks.push(book);
    } else {
      this.selectedBooks.splice(this.selectedBooks.findIndex(b => b.id === book.id), 1);
    }
  }

  selectAllBooks(event: MatCheckboxChange) {
    event.source.checked = true;
    this.selectedBooks.push(...this.books);
  }

  saveBooks() {
    console.log(this.selectedBooks);
    this.dataService.saveBooks(this.selectedBooks).subscribe(response => {
      console.log(response);

    })
  }

  queryBooks() {
    this.dataService.getGoogleBooks(this.queryText, this.queryPage).subscribe(booksResponse => {
      this.books = booksResponse.items;
    })
  }
}
