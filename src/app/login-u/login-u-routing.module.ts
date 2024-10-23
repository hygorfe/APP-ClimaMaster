import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginUPage } from './login-u.page';

const routes: Routes = [
  {
    path: '',
    component: LoginUPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginUPageRoutingModule {}
