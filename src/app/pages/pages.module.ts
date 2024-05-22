import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

const components = [
  AuthComponent,
  RegisterComponent,
  ChangePasswordComponent
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule,
    PagesRoutingModule
  ],
  exports: components,
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdrvNwpAAAAABkwFe2ghyxIXpzYMVRkrRrvQDlJ'
      } as RecaptchaSettings
    }
  ],
})
export class PagesModule { }
