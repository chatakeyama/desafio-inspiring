import { IOferta } from './../interfaces/IOferta.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class HttpGameService {

  private API_URL = environment.API

  constructor(private http: HttpClient) { }

  getGamesList(): Observable<Game[]> {
    return this.http.get<IOferta[]>(`${this.API_URL}?pageNumber=0&pageSize=12&storeID=1&onSale=1&AAA=1`)
      .pipe(
        map((ofertas) => ofertas.map((oferta) => new Game(oferta))),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}