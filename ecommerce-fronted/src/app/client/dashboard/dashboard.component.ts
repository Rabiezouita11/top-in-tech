import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScriptService } from '../../Service/script/script.service';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitter';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';
import { CookieService } from 'ngx-cookie-service';

const SCRIPT_PATH_LIST = ['assets/client/js/script.js'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  message!: number;
  api = 'http://localhost:3000/';
  list: any;
  ListCategorie: any;
  authenticated!: false;

  constructor(
    private router: Router,
    route: ActivatedRoute,
    private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private http: HttpClient,
    private toastr: ToastrService,
    private SocketIOServiceService: SocketIOServiceService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
   

    // this.socket.on('ban', (data) => {
    //   if (data == 'user ban') {
    //     this.toastr.error('Vous êtes banni', 'Erreur', {
    //       timeOut: 3000,
    //       progressBar: true,
    //       progressAnimation: 'increasing',
    //       positionClass: 'toast-top-right',
    //     });
    //   }

    // });

    SCRIPT_PATH_LIST.forEach((e) => {
      const scriptElement = this.ScriptServiceService.loadJsScript(
        this.renderer,
        e
      );
      scriptElement.onload = () => {
        this.showallCat();
        this.showAllProduit();

        console.log('loaded');
      };
      scriptElement.onerror = () => {
        console.log('Could not load the script!');
      };
    });
    // refresh page after add produit to panier

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
  }

  showallCat() {
    this.http.get('api/categories/affichercategorie').subscribe((data: any) => {
      this.ListCategorie = data;
      console.log(this.ListCategorie);
    });
  }
  showAllProduit() {
    this.http.get('api/produit/afficherAllProduit').subscribe((data: any) => {
      try {
        this.list = data;
        console.log(this.list);
      } catch (error) {
        console.log(error);
      }
    });
  }

  ajouterPanier(id: number, idProduit: number, prix: number) {
    if (id == null) {
      this.toastr.error(
        'Vous devez vous connecter pour ajouter au panier',
        'Erreur',
        {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        }
      );
      this.router.navigate(['/login']);
    }

    this.http
      .post('api/panier/ajouterPanier', {
        id: id,
        idProduit: idProduit,
        prix: prix,
      })
      .subscribe(
        (data: any) => {
          this.toastr.success('Produit ajouté au panier', 'Succès', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          });
          // how refresh component headercomponent  after add produit to panier angular 13 ?

          this.SocketIOServiceService.emit('idusercountprdouit', id);
        },
        (error) => {
          this.toastr.error('Produit deja ajouté au panier', 'Erreur', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          });
        }
      );
  }
}

// use guard in angular 13  to protect routes in angular 13
//
//
//
//
// how replace  /  with  \  in angular 13 ?
