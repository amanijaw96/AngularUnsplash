import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private Search_url =
    'https://api.unsplash.com/search/photos/?client_id=K7vuivmZLjlM-TNmHAJ2mhgrdukhZRpi18kUiMz3IJE&per_page=20&query=';

  private SERVER_URL =
    'https://api.unsplash.com/photos/?client_id=K7vuivmZLjlM-TNmHAJ2mhgrdukhZRpi18kUiMz3IJE&per_page=20';

  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public get(search: string) {
    let response = this.httpClient.get(
      search !== '' ? this.Search_url + search : this.SERVER_URL
    );
    return response;
  }
}
