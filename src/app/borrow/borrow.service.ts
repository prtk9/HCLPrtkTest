import { Injectable } from '@angular/core';
import { BooksModel } from '../bookModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  endpoints = {
    'borrowBooks': '',
    'getBookDetails': ''
  }

  constructor(private httpClient: HttpClient) { }

  borrowBooks (payload: BooksModel): Observable<any> {
    return this.httpClient.post(this.endpoints.borrowBooks, payload);
  }

  getBookDetails (payload: string): Observable<any> {
    return this.httpClient.post(this.endpoints.getBookDetails, payload);
  }
}
