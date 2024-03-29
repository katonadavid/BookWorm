import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Publication } from "../models/Publication";
import { PublicationTableRequestDTO } from "../models/PublicationTableRequestDTO";
import { PublicationTableResponseDTO } from "../models/TableResponseDTO";


@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private apiBaseUrl = environment.apiUrl + 'publications/';

  constructor(private http: HttpClient) {}

  deletePublication(id: string) {
    return this.http.delete(this.apiBaseUrl, { body: [id]});
  }

  getPublications(request: PublicationTableRequestDTO) {
    let params = new HttpParams().set('pageIndex', request.pageIndex ?? 1).set('pageSize', request.pageSize ?? 10);

    if (request.sortOrder) {
      params = params.set('sortOrder', request.sortOrder);
    }

    if (request.sortColumn) {
      params = params.set('sortColumn', request.sortColumn);
    }

    console.log(params);


    return this.http.get<PublicationTableResponseDTO>(this.apiBaseUrl, { params });
  }
}
