import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitter';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScriptService } from './../../Service/script/script.service';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authenticated = false;
  ListCategorie: any;
  ListPanier: any;
  login: string = '';
  x: number = 0;
  idUser: number = 0;
  ListCountPanier: any;
  totalePrixPanier: any;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private toastr: ToastrService,
    private http: HttpClient,
    private currentRoute: ActivatedRoute
  ) {


  }



  ngOnInit(): void {
    this.showallCat();

    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });

    try {
      this.http
        .get('api/auth/getUser', { withCredentials: true })
        .subscribe((user: any) => {
          this.authenticated = true;
          this.login = user.nom;
          const id = user.id;
          console.log(id);
          this.http
            .get('api/panier/afficherPanierparId/' + id)
            .subscribe((data: any) => {
              this.ListPanier = data;


            }),
            this.http
              .get('api/panier/countCloneProduit/' + id)
              .subscribe((data: any) => {
                this.ListCountPanier = data;

                console.log(this.ListCountPanier);

              }),
            this.http.get('api/panier/totaleprixpanier/' + id).subscribe(
              (data: any) => {
                this.totalePrixPanier = data;
                console.log(this.totalePrixPanier);

                Emitters.authEmitter.emit(true);
              },
              (error: any) => {
                this.authenticated = false;
                Emitters.authEmitter.emit(false);
              }
            );
        });
    } catch (e) {
      this.authenticated = false;
      Emitters.authEmitter.emit(false);
    }
  }

  deletePanier(idProduit: number) {
    this.http
      .get('api/auth/getUser', { withCredentials: true })
      .subscribe((user: any) => {
        this.authenticated = true;

        const id = user.id;

        this.http
          .delete('api/panier/deletePanier/' + id + '/' + idProduit)
          .subscribe((data: any) => {
            this.toastr.success('Produit supprimé avec succès');
            this.ngOnInit();
          });
      });
  }

  logout(): void {
    this.http
      .post('api/auth/logout', {}, { withCredentials: true })
      .subscribe(() => (this.authenticated = false));
    this.router.navigate(['/accueil']);
  }
  showallCat() {
    this.http.get('api/categories/affichercategorie').subscribe((data: any) => {
      this.ListCategorie = data;

      console.log(this.ListCategorie);
    });
  }
}
