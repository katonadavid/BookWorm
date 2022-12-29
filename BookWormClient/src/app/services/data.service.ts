import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { GoogleBookModel, GoogleBooksApiResponse } from "../models/google-book-model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private googleApiBaseUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
  private apiBaseUrl = environment.apiUrl + '/books';

  constructor(private http: HttpClient) {
  }

  getNewBooks(query: string) {
    return this.http.get<GoogleBooksApiResponse>(`${this.googleApiBaseUrl + query}`);
  }

  saveBooks(books: GoogleBookModel[]) {
    return this.http.post<void>(this.apiBaseUrl, {books}, {
      observe: 'body'
    });
  }
}
