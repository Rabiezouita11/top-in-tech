import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ScriptService } from './../../Service/script/script.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Emitters } from 'src/app/emitters/emitter';
import { filter } from 'rxjs';

const SCRIPT_PATH_LIST = [
  'assets/client/js/script.js',
  'assets/client/js/price-range.js',
];

@Component({
  selector: 'app-single-categorie',
  templateUrl: './single-categorie.component.html',
  styleUrls: ['./single-categorie.component.css'],
})
export class SingleCategorieComponent implements OnInit {
  listcatProduit: any;
  catnom: any;
  catimage: any;
  message!: number;
  public route: any = '';
  constructor(
    private _router: Router,
    private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private toastr: ToastrService,
    private http: HttpClient,
    private currentRoute: ActivatedRoute
  ) {
    // how reload page angular with router navigate ?
    this.route = this._router.url;
  }

  ngOnInit(): void {
    SCRIPT_PATH_LIST.forEach((e) => {
      const scriptElement = this.ScriptServiceService.loadJsScript(
        this.renderer,
        e
      );
      scriptElement.onload = () => {
        console.log('loaded');
        
    const id = this.currentRoute.snapshot.paramMap.get('id');

    this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
      (res: any) => {
        let str = 'http://localhost:4200/' + 'api' + '/' + res.image;
        this.message = res.id;
        // this.message = `${this.api+res.image}`;
        // how show image in toast angular 13 ?

        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
      }
    );

    this.http
      .get('api/categories/findProduitbycategorieid/' + id)
      .subscribe((data: any) => {
        console.log(data);

        this.listcatProduit = data;
      });

    this.http
      .get('api/categories/findCategoriebyid/' + id)
      .subscribe((data: any) => {
        this.catnom = data.name;
        this.catimage = data.Image;
      });

    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.route = this._router.url;
        console.log(this.route);
        // do something here when route changes

        const id = this.currentRoute.snapshot.paramMap.get('id');

        this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
          (res: any) => {
            let str = 'http://localhost:4200/' + 'api' + '/' + res.image;
            this.message = res.id;
            // this.message = `${this.api+res.image}`;
            // how show image in toast angular 13 ?

            Emitters.authEmitter.emit(true);
          },
          (err) => {
            Emitters.authEmitter.emit(false);
          }
        );

        this.http
          .get('api/categories/findProduitbycategorieid/' + id)
          .subscribe((data: any) => {
            console.log(data);

            this.listcatProduit = data;
          });

        this.http
          .get('api/categories/findCategoriebyid/' + id)
          .subscribe((data: any) => {
            this.catnom = data.name;
            this.catimage = data.Image;
          });
      });
      };
      scriptElement.onerror = () => {
        console.log('Could not load the script!');
      };
    });

    // how reload page angular with router navigate ?
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
      this._router.navigate(['/login']);
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
        },
        (error) => {
          this.toastr.error('produit existe déjà dans le panier', 'Erreur', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          });
        }
      );
  }
}
