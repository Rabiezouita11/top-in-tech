import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScriptService } from '../../Service/script/script.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitters/emitter';
import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

const SCRIPT_PATH_LIST = [
  'assets/client/js/jquery-3.3.1.min.js',

  'assets/client/js/menu.js',

  'assets/client/js/lazysizes.min.js',

  'assets/client/js/price-range.js',

  'assets/client/js/slick.js',

  'assets/client/js/bootstrap.bundle.min.js',

  'assets/client/js/bootstrap-notify.min.js',

  'assets/client/js/theme-setting.js',
  'assets/client/js/script.js',
];

@Component({
  selector: 'app-component-client',
  templateUrl: './component-client.component.html',
  styleUrls: ['./component-client.component.css'],
})
export class ComponentClientComponent implements OnInit {
  message: any;
  authenticated!: false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private ScriptServiceService: ScriptService,
    private http: HttpClient,
    private toastr: ToastrService,
    private SocketIOServiceService: SocketIOServiceService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.SocketIOServiceService.listen('produithorsStock').subscribe(
      (data: any) => {
        this.toastr.error('Le produit ' + data.xx.nom + ' est hors stock', 'Error', {
          timeOut: 7000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        });

      
        console.log(data);
      }
    );
    this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
      (res: any) => {
        let str = 'http://localhost:4200/' + 'api' + '/' + res.image;
        this.message = res.id;
        // this.message = `${this.api+res.image}`;
        // how show image in toast angular 13 ?
        this.SocketIOServiceService.emit('message', res.id);

        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
      }
    );

this.SocketIOServiceService.listen('avis').subscribe((data: any) => {
  console.log('aaaaaaaaaaaaaaaaaaa'+data.idUser);
     if (data.idUser == this.message) {
      this.toastr.error(data.avis, 'avis singaler ', {
        timeOut: 7000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
    }
  });

      


    this.SocketIOServiceService.listen('ban').subscribe((data: any) => {
      console.log(data.userId);
      console.log(data);
      if (data.userId == this.message) {
        this.http
          .post('api/auth/logout', {}, { withCredentials: true })
          .subscribe((data) => {
            console.log(data);
            this.authenticated = false;
            Emitters.authEmitter.emit(false);
            this.cookieService.delete('jwt');

            this.router.navigate(['/login']).then(() => {
              window.location.reload();
            });
          });

        this.toastr.error('Vous êtes banni', 'Erreur', {
          timeOut: 7000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        });
      }
    });
    SCRIPT_PATH_LIST.forEach((e) => {
      const scriptElement = this.ScriptServiceService.loadJsScript(
        this.renderer,
        e
      );
      scriptElement.onload = () => {
        console.log('loaded');

      };
      scriptElement.onerror = () => {
        console.log('Could not load the script!');
      };
    });


  }
  onActive() {
    window.scrollTo(0, 0);
  }
}
