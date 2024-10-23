import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { ClimatempoService } from './../services/climatempo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  cidade: string = 'Rio de Janeiro';
  clima: any;
  localTime: string | null = null;
  dayOfWeek: string | null = null;

  constructor(private climatempoService: ClimatempoService, private sharedService: SharedService) {}

  ngOnInit() {
    this.getWeatherData();
    this.initModal();
  }


  onCityChange(event: any){
    this.cidade = event.target.value;
    this.getWeatherData();
    this.sharedService.changeCity(this.cidade);
  }


  getWeatherData() {
    this.climatempoService.getWeather(this.cidade).subscribe(data => {
      this.clima = data;
      this.localTime = this.calculateLocalTime(data.timezone);
      this.dayOfWeek = this.calculateDayOfWeek(data.dt, data.timezone);
    });
  }

  calculateLocalTime(timezone: number): string {
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + timezone * 1000);
    return localTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  calculateDayOfWeek(timestamp: number, timezone: number): string {
    const utcTime = (timestamp + timezone) * 1000;
    const localDate = new Date(utcTime);
    const fullDay = localDate.toLocaleDateString('pt-Br', {weekday: 'long'});
    return fullDay.substring(0, 3);
  }

  convertToCelsius(kelvin: number): number {
    return kelvin - 273.15;
  }

  getIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  initModal() {
      const openModalButton = document.querySelector('#openModal') as HTMLButtonElement;
      const modal = document.querySelector('#modal') as HTMLDivElement;
      const searchInput = document.querySelector('.custom') as HTMLIonSearchbarElement;

      openModalButton.addEventListener('click', () =>{
        modal.classList.toggle('active')
        searchInput.classList.remove('hidden')

      })

      window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!modal.contains(target) && target !== openModalButton) {
          modal.classList.remove('active');
          searchInput.classList.add('hidden')
        }
      });
      
      searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          this.getWeatherData();
          modal.classList.remove('active');
          searchInput.classList.add('hidden')
        }else{
          searchInput.classList.remove('hidden')
        }
      });


  }
  

}
