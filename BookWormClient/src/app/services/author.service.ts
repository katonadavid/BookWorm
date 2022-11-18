import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthorService {

  private apiUrl = environment.apiUrl + 'author';

  constructor(private httpClient: HttpClient) { }

  getAuthors() {
    return this.httpClient.get(this.apiUrl);
  }

}
