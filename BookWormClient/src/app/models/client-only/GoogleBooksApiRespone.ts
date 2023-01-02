import { GoogleBookModel } from "../GoogleBook";

export interface GoogleBooksApiResponse {
  items: GoogleBookModel[];
  totalItems: number;
}
