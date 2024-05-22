import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component'
import { ChangePasswordComponent } from './change-password/change-password.component'
import { LandingPageComponent } from './landing-page/landing-page.component'
import { BussineResolver } from '../http/resolvers/bussine.resolver';
import { LocalStorageResolver } from '../http/resolvers/local-storage.resolver';

const routes: Routes = [
  {
    path: 'oauth/:redirectTo',
    component: AuthComponent,
    resolve: {
      localStorage: LocalStorageResolver,
      bussinesData: BussineResolver,
    }
  },
  {
    path: 'oauth/:redirectTo/change-password',
    component: ChangePasswordComponent,
    resolve: {
      localStorage: LocalStorageResolver,
    }
  },
  { path: '**', component: LandingPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
