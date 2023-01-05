import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ForgetpasswordComponent} from "./forgetpassword/forgetpassword.component";
import { GuardloginGuard } from './guard/guardlogin.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent , data: {title: 'accueil'} , canActivate: [GuardloginGuard] },
  { path: 'register', component: RegisterComponent , data: {title: 'accueil'}  , canActivate: [GuardloginGuard] },
  { path: 'forgetPassword', component: ForgetpasswordComponent , data: {title: 'accueil'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
