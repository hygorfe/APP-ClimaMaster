import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiasService {
  private apikey = '9c0bf4e09678a7df202fe29015aac787';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast'

  constructor(private http: HttpClient) { }

  getFiveDayForecast(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${city}&appid=${this.apikey}&units=metric&lang=pt_br`);
  }
}
