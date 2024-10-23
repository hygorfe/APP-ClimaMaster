import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'
registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AppRoutingModule],
  providers: [provideHttpClient() ,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, [DatePipe, {
    provide: LOCALE_ID, useValue: 'pt'
  }]],
  bootstrap: [AppComponent],
})
export class AppModule {}
