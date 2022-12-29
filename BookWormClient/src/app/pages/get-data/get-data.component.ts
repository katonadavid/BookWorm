import { Component, OnInit } from '@angular/core';
import { GoogleBookModel } from 'src/app/models/google-book-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.scss']
})
export class GetDataComponent implements OnInit {

  books: GoogleBookModel[] = [];
  selectedBooks: GoogleBookModel[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
      this.dataService.getNewBooks('max').subscribe(booksResponse => {
        this.books = booksResponse.items;
      })
  }

  bookChecked(event: any, book: GoogleBookModel) {
    if (event.target.checked) {
      console.log(book.id);
      this.selectedBooks.push(book);
    } else {
      this.selectedBooks.splice(this.selectedBooks.findIndex(b => b.id === book.id), 1);
    }
  }

  saveBooks() {
    console.log(this.selectedBooks);
    this.dataService.saveBooks(this.selectedBooks).subscribe(response => {
      console.log(response);

    })
  }
}
