import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    AuthComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule

  ]
})
export class AuthModule { }
