import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(  private router: Router, private cookieService: CookieService, private http: HttpClient) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      this.http.get('/api/auth/getUser', {withCredentials: true}).subscribe(
        (res: any) => {
         if (res.role === 'user') {
           return true;
         }else {
           this.router.navigate(['/dashboard']);
           return false;
         }


        },
        err => {
          this.router.navigate(['/login']);
          return false;
        }
      );

      return true;



  }



}


