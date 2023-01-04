import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Book } from "../models/Book";
import { GoogleBooksApiResponse } from "../models/client-only/GoogleBooksApiRespone";
import { GoogleBookModel } from "../models/GoogleBook";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private googleApiBaseUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiBaseUrl = environment.apiUrl + 'books/';
  private maxResultCount = 40;

  constructor(private http: HttpClient) {
  }

  getGoogleBooks(query: string, page: number = 0) {
    const params = new HttpParams().set('q', query).set('startIndex', page).set('maxResults', this.maxResultCount).set('printType', 'books');
    return this.http.get<GoogleBooksApiResponse>(this.googleApiBaseUrl, { params });
  }

  saveGoogleBooks(books: GoogleBookModel[]) {
    return this.http.post<void>(this.apiBaseUrl, books, {
      observe: 'body'
    });
  }

  deleteBook(id: number) {
    return this.http.delete(this.apiBaseUrl, { body: [id]});
  }

  getBooks() {
    return this.http.get<Book[]>(this.apiBaseUrl);
  }
}
