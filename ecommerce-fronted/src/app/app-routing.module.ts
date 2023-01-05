import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ComponentClientComponent} from "./client/component-client/component-client.component";
import {ComponentComponent} from "./admin/component/component.component";
import {AuthComponent} from "./auth/auth.component";
import { GuardGuard } from './auth/guard/guard.guard';
import { GuardAdminGuard } from './guard/guard-admin.guard';


const routes: Routes = [


  { path: '', component: ComponentComponent, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canActivate: [GuardAdminGuard] },
  { path: '', component: ComponentClientComponent, loadChildren: () => import('./client/client.module').then(m => m.ClientModule)   },
  { path: '', component: AuthComponent, loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { };

