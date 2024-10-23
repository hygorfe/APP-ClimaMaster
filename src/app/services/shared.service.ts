import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private citySource = new BehaviorSubject<string>('Rio de Janeiro');
  currentCity = this.citySource.asObservable();

  changeCity(city: string){
    this.citySource.next(city);
  }

  constructor() { }
}
