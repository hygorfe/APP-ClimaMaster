import { formatDate } from '@angular/common';
import { DiasService } from './../services/dias.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from './../services/shared.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  todayForecast: any[] = [];
  madrugadaForecast: any;
  morningForecast: any;
  afternoonForecast: any;
  eveningForecast: any;
  cidade: string = 'Rio de Janeiro';

  constructor(private diasService: DiasService, private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentCity.subscribe(city => {
      this.cidade = city;
      this.getFiveDayForecast(this.cidade);
    });
  }

  getFiveDayForecast(city: string) {
    this.diasService.getFiveDayForecast(city).subscribe(data => {
      console.log('API Response:', data);
      const currentDate = new Date();
      let forecastList = this.filterForecastByDate(data.list, currentDate);

      if (forecastList.length === 0) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 1);
        forecastList = this.filterForecastByDate(data.list, nextDate);
      }

      console.log('Filtered Forecast List:', forecastList);

      this.madrugadaForecast = this.getForecastByTimePeriod(forecastList, 0, 6);
      this.morningForecast = this.getForecastByTimePeriod(forecastList, 6, 12);
      this.afternoonForecast = this.getForecastByTimePeriod(forecastList, 12, 18);
      this.eveningForecast = this.getForecastByTimePeriod(forecastList, 18, 24);

      console.log('Madrugada Forecast:', this.madrugadaForecast);
      console.log('Morning Forecast:', this.morningForecast);
      console.log('Afternoon Forecast:', this.afternoonForecast);
      console.log('Evening Forecast:', this.eveningForecast);
    });
  }

  filterForecastByDate(forecastList: any[], date: Date) {
    return forecastList.filter((forecast: any) => {
      const forecastDate = new Date(forecast.dt_txt);
      return forecastDate.toDateString() === date.toDateString();
    });
  }

  getForecastByTimePeriod(forecastList: any[], startHour: number, endHour: number) {
    const forecasts = forecastList.filter((forecast: any) => {
      const hour = new Date(forecast.dt * 1000).getHours();
      console.log('Forecast Hour:', hour);
      return hour >= startHour && hour < endHour;
    });
    return forecasts.length > 0 ? forecasts[0] : null;
  }

  

  getFormattedHour(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  getDayOfWeek(timestamp: number): string {
    const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const date = new Date(timestamp * 1000);
    return daysOfWeek[date.getDay()];
  }

  getIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  
  getRainVolume(forecast: any): string {
    return forecast.rain ? `${forecast.rain['3h']} mm` : 'Sem precipitação';
  }

  getPressure(forecast: any): number{
    return forecast.main.pressure;
  }

  getLightningProbability(forecast: any): string{
    return forecast.weather.some((condition: any) => condition.main === 'Thunderstorm') ? 'Alta' : 'Nenhuma Probabilidade'
  }

}
 