import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [


    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ClientModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),


  ],
  providers: [CookieService],
  bootstrap: [AppComponent],

})
export class AppModule {}
