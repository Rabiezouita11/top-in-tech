import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardloginGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.http.get('/api/auth/getUser', {withCredentials: true}).subscribe(
        (res: any) => {
         if (res.length === 0) {
           return true;
         }else if (res.role === 'user') {
          this.router.navigate(['/accueil']);
           return false;
         }else {
          this.router.navigate(['/dashboard']);
           return false;
         }



        },
        err => {
          return true;
        }


      );

      return true;



  }
  }


