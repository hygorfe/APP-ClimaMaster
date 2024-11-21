import { SharedService } from './../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { ClimatempoService } from './../services/climatempo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  displayName: string = 'Anônimo';
  isLoggedIn: boolean = false;

  constructor(private climatempoService: ClimatempoService, private sharedService: SharedService, private afAuth: AngularFireAuth, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getWeatherData();
    this.initModal();
    this.openModalInit();

    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.displayName = user.displayName || 'Anônimo';
        this.isLoggedIn = true;
      }else{
        this.displayName = 'Anônimo';
        this.isLoggedIn = false;
      }
    })
  }
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/tab1'])
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
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

  initModal() {
    const openModalButton = document.querySelector('#openModal') as HTMLButtonElement;
    const modal = document.querySelector('#modal') as HTMLDivElement;
    const searchInput = document.querySelector('.custom') as HTMLIonSearchbarElement;
  
    if (openModalButton && modal && searchInput) {
      openModalButton.addEventListener('click', () => {
        modal.classList.toggle('active');
        searchInput.classList.remove('hidden');
        searchInput.style.opacity = '1';
      });
  
      window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (modal instanceof Node && openModalButton instanceof Node && !modal.contains(target) && target !== openModalButton) {
          modal.classList.remove('active');
        }
      });

    
      searchInput.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          this.getWeatherData();
          modal.classList.remove('active');
        }
      });
    } else {
      console.error('One or more DOM elements not found');
    }
    
  }


  openModalInit() {
    const modalMap = document.querySelector('#modalMap') as HTMLDivElement;
    const activeModal = document.querySelector('#activeModal') as HTMLButtonElement;
  
    if (activeModal && modalMap) {
      activeModal.addEventListener('click', () => {
        console.log('Botão de modal clicado');
        modalMap.classList.toggle('open');
        console.log('Classes do modalMap:', modalMap.classList);
      });
    } else {
      console.error('Elementos activeModal ou modalMap não foram encontrados');
    }
  
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      console.log('Clique detectado', target);
      if (modalMap instanceof Node && target instanceof Node && !modalMap.contains(target) && target !== activeModal) {
        modalMap.classList.remove('open');
        console.log('Fechou modal');
      }
    });
  }
  
  

}
