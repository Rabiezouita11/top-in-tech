import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ScriptService } from '../../Service/script/script.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitters/emitter';
import { filter } from 'rxjs';

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
  selector: 'app-singlepage-product',
  templateUrl: './singlepage-product.component.html',
  styleUrls: ['./singlepage-product.component.css'],
})
export class SinglepageProductComponent implements OnInit {
  @ViewChild('inputnoter1') inputnoter1!: ElementRef;
  @ViewChild('inputnoter2') inputnoter2!: ElementRef;
  @ViewChild('inputnoter3') inputnoter3!: ElementRef;
  @ViewChild('inputnoter4') inputnoter4!: ElementRef;
  @ViewChild('inputnoter5') inputnoter5!: ElementRef;

  message: any;
  public route: any = '';
  idproduitss: any;
  nom: any;
  prix: any;
  image: any;
  Description: any;
  quantite: any;
  promotion: any;
  date_exp: any;
  prixold: any;
  numberpromotion: any;
  image2: any;
  idProduit: any;
  countlike: any;
  numberRate: number = 0;
  constructor(
    private ScriptServiceService: ScriptService,
    private _router: Router,
    private renderer: Renderer2,

    private toastr: ToastrService,
    private http: HttpClient,
    private currentRoute: ActivatedRoute,
    private router: Router
  ) {
    this.route = this._router.url;
  }

  ngOnInit() {
    const id = this.currentRoute.snapshot.paramMap.get('id');

    this.http
      .get('api/like/getcountlikebyidproduit/' + id)
      .subscribe((data: any) => {
        this.countlike = data.countlike;
        console.log(this.countlike);
      });
    this.http
      .get('api/totale/afficheRate' + '/' + id)
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          this.numberRate += parseInt(data[i].noter) / data.length;
        }
      });

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
      .get('api/produit/afficheproduitparid/' + id)
      .subscribe((data: any) => {
        this.idproduitss = data.id;
        this.nom = data.nom;
        this.prix = data.prix;
        this.image2 = data.image;
        this.Description = data.Description;
        this.quantite = data.quantite;
        this.promotion = data.promotion;
        this.date_exp = data.date_exp;
        this.prixold = data.prixold;
        this.idProduit = data.id;
        this.numberpromotion = data.numberpromotion;
      });
    this.http
      .get('api/produit/afficheImageProduit/' + id)
      .subscribe((data: any) => {
        this.image = data;
        console.log(this.image);
      });

    this.http
      .get('api/noterproduit/checkRateexistUser/' + this.message + '/' + id)
      .subscribe(
        (res: any) => {
          console.log(res.message);
        },
        (err) => {}
      );

    // how reload page angular with router navigate ?

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
          this.toastr.success(
            'Produit ajouté au panier avec succès',
            'Ajouté au panier',
            {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
          this.ngOnInit();
        },
        (err: any) => {
          this.toastr.error('Produit existe déjà dans le panier', 'Erreur', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          });
        }
      );
  }
  jaime(id: number, idProduit: number) {
    if (this.message == null) {
      this.toastr.error('Vous devez vous connecter', 'Erreur', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
      this._router.navigate(['/login']);
    }

    this.http
      .post('api/like/ajouterlike', { id_user: id, id_produit: idProduit })
      .subscribe(
        (data: any) => {
          if (data.message == 'like ajouté') {
            this.toastr.success('Vous aimez ce produit', 'Ajouté au panier', {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            });
            this.router.navigate(['/singleProduct/' + idProduit]).then(() => {
              window.location.reload();
            });
          } else {
            this.toastr.error('Vous n aimez pas ce produit', 'Erreur', {
              timeOut: 3000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            });
          }
          this.router.navigate(['/singleProduct/' + idProduit]).then(() => {
            window.location.reload();
          });
        },
        (err: any) => {
          this.toastr.error('Vous devez vous connecter', 'Erreur', {
            timeOut: 3000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          });
        }
      );
    this.ngOnInit();
  }

  noterProduit(id: number, idProduit: number) {
    if (
      this.inputnoter1.nativeElement.checked == false &&
      this.inputnoter2.nativeElement.checked == false &&
      this.inputnoter3.nativeElement.checked == false &&
      this.inputnoter4.nativeElement.checked == false &&
      this.inputnoter5.nativeElement.checked == false
    ) {
      this.toastr.error('Vous devez choisir une note', 'Erreur', {
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',
      });
    }

    if (this.inputnoter1.nativeElement.checked == true) {
      console.log(this.inputnoter1.nativeElement.value);
      this.http
        .post('api/noterproduit/ajouterRate', {
          id_user: id,
          id_produit: idProduit,
          noter: this.inputnoter1.nativeElement.value,
        })
        .subscribe((data: any) => {
          if (data.message == 'note ajoutée') {
            this.toastr.success(
              'Vous aimez noter ce produit',
              'noter Produit',
              {
                timeOut: 3000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right',
              }
            );
          }
        });
      this.router.navigate(['/singleProduct/' + idProduit]).then(() => {
        window.location.reload();
      });
    }
    if (this.inputnoter2.nativeElement.checked == true) {
      console.log(this.inputnoter2.nativeElement.value);
      this.http
        .post('api/noterproduit/ajouterRate', {
          id_user: id,
          id_produit: idProduit,
          noter: this.inputnoter2.nativeElement.value,
        })
        .subscribe((data: any) => {
          if (data.message == 'note ajoutée') {
            this.toastr.success(
              'Vous aimez noter ce produit',
              'noter Produit',
              {
                timeOut: 3000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right',
              }
            );
          }
        });
      this.router.navigate(['/singleProduct/' + idProduit]).then(() => {
        window.location.reload();
      });
    }
    if (this.inputnoter3.nativeElement.checked == true) {
      console.log(this.inputnoter3.nativeElement.value);
      this.http
        .post('api/noterproduit/ajouterRate', {
          id_user: id,
          id_produit: idProduit,
          noter: this.inputnoter3.nativeElement.value,
        })
        .subscribe((data: any) => {
          if (data.message == 'note ajoutée') {
            this.toastr.success(
              'Vous aimez noter ce produit',
              'noter Produit',
              {
                timeOut: 3000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right',
              }
            );
          }
        });
      this.router.navigate(['/singleProduct/' + idProduit]).then(() => {
        window.location.reload();
      });
    }

    if (this.inputnoter4.nativeElement.checked == true) {
      console.log(this.inputnoter4.nativeElement.value);
      this.http
        .post('api/noterproduit/ajouterRate', {
          id_user: id,
          id_produit: idProduit,
          noter: this.inputnoter4.nativeElement.value,
        })
        .subscribe((data: any) => {
          if (data.message == 'note ajoutée') {
            this.toastr.success(
              'Vous aimez noter ce produit',
              'noter Produit',
              {
                timeOut: 3000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right',
              }
            );
          }
        });
      this.router.navigate(['/singleProduct/' + idProduit]).then(() => {
        window.location.reload();
      });
    }

    if (this.inputnoter5.nativeElement.checked == true) {
      console.log(this.inputnoter5.nativeElement.value);
      this.http
        .post('api/noterproduit/ajouterRate', {
          id_user: id,
          id_produit: idProduit,
          noter: this.inputnoter5.nativeElement.value,
        })
        .subscribe((data: any) => {
          if (data.message == 'note ajoutée') {
            this.toastr.success(
              'Vous aimez noter ce produit',
              'noter Produit',
              {
                timeOut: 3000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right',
              }
            );
          }
        });
      this.router.navigate(['/singleProduct/' + idProduit]).then(() => {
        window.location.reload();
      });
    }
  }
}
