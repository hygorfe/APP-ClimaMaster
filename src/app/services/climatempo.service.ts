import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimatempoService {
  private apiKey = '9c0bf4e09678a7df202fe29015aac787';
  private apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  
  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.apiUrl}&q=${city}&units=metric&lang=pt_br`);
  }
}

