import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUPageRoutingModule } from './login-u-routing.module';

import { LoginUPage } from './login-u.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUPageRoutingModule
  ],
  declarations: [LoginUPage]
})
export class LoginUPageModule {}
