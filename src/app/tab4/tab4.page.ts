import { SharedService } from './../services/shared.service';
import { OitoDiasService } from './../services/oito-dias.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  dailyForecast: any[] = [];
  cidade: string = 'Rio de Janeiro';

  constructor(private oitoDiasService: OitoDiasService, private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentCity.subscribe(city => {
      this.cidade = city;
      this.getFiveDayForecast(city);
    });
  }

  getFiveDayForecast(city: string) {
    this.oitoDiasService.getFiveDayForecast(city).subscribe(data => {
      console.log('API Response:', data);
      const groupedForecasts = this.groupByDay(data.list);
      this.dailyForecast = Object.keys(groupedForecasts).map(date => {
        return {
          date,
          ...groupedForecasts[date][0]  
        };
      });
      console.log('Daily Forecast:', this.dailyForecast);
    });
  }

  groupByDay(forecastList: any[]) {
    return forecastList.reduce((grouped: any, forecast: any) => {
      const date = forecast.dt_txt.split(' ')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(forecast);
      return grouped;
    }, {});
  }


  getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  getDayOfWeekShort(dateString: string): string{
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {weekday: 'short'})
  }


  getDayMonth(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }
  
  }



