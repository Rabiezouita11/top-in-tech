import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptService } from './../../Service/script/script.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { GeoLocalisationServiceService } from './../../Service/GeoLocalisationService/geo-localisation-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {


  @ViewChild('inputcoupoun') inputcoupoun!: ElementRef;
  cash = "cash";
  stripe = "stripe";
   idd : any;
  authenticated = false;
  listProduit: any;
  paymentHandler: any = null;
  totalePrixPanier: any;
  nom: any;
  prenom: any;
  email: any;
  cin: any;
  produits: any;
  listcoupon : any;
listproduits :any = [];
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private http: HttpClient,
    private toastr: ToastrService,
   private geolocalisationservice: GeoLocalisationServiceService
  ) {}



  ngOnInit() {


    try {
      this.http
        .get('api/auth/getUser', { withCredentials: true })
        .subscribe((user: any) => {
          this.authenticated = true;
          this.nom = user.nom;
          this.prenom = user.prenom;
          this.email = user.email;
          this.cin = user.cin;

          const id = user.id;
          this.idd = id;

          this.http
            .get('api/panier/afficherPanierparId/' + id)
            .subscribe((data: any) => {
              this.listProduit = data;



            }),
            this.http
              .get('api/panier/totaleprixpanier/' + id)
              .subscribe((data: any) => {
                this.totalePrixPanier = data;

              }),
              this.http.get('api/coupon/affichecouponbyiduser/' + id).subscribe(
                (data: any) => {
                  this.listcoupon = data;
                }
              );
        });
    } catch (error) {
      this.authenticated = false;
    }

    this.invokeStripe();
  }


  PlaceOrder()  {
console.log('***********************')
console.log(this.inputcoupoun.nativeElement.value)

if (this.listProduit.length == 0) {
  this.toastr.error('Votre panier est vide');
} else {
  for (let i = 0; i < this.listProduit.length; i++) {
    this.listproduits.push(this.listProduit[i].nom_produit +'*'+ this.listProduit[i].quantite);
  }

  this.geolocalisationservice.getLocationService().then(res => {

    this.http.post('api/checkout/placeorder', {
      id_user: this.idd,
      lat: res.lat,
      lng: res.lng,
      totaleprix  : this.totalePrixPanier,
      Produits: this.listproduits,
      couponn : this.inputcoupoun.nativeElement.value,
      paymentMethod: this.cash
    }
    ).subscribe(
      (data: any) => {
        console.log(data);

        this.toastr.success('Votre commande a été bien enregistrée');
        this.listproduits = [];

        this.router.navigate(['/order'+ '/' + data.commandeuser.id]);
      }

    );

    }).catch(err =>
      console.log(err))

}


  }

















  makePayment(amount: any) {
    if (this.listProduit.length == 0) {
      this.toastr.error('Votre panier est vide');
    } else {


    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LeymeKxK5TNzzT1OfYRh4tZp1fQDwvadEFObYyRLnPwBa3Jw3r51HSstR3wyziuVUTOsaLBJSMKP1w8OFsza8Ej009sUbkWS6',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');


      },

    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  for (let i = 0; i < this.listProduit.length; i++) {
    this.listproduits.push(this.listProduit[i].nom_produit +'*'+ this.listProduit[i].quantite);
  }

  this.geolocalisationservice.getLocationService().then(res => {

    this.http.post('api/checkout/placeorder', {
      id_user: this.idd,
      lat: res.lat,
      lng: res.lng,
      totaleprix  : this.totalePrixPanier,
      Produits: this.listproduits,
      couponn : this.inputcoupoun.nativeElement.value,
      paymentMethod: this.stripe
    }
    ).subscribe(
      (data: any) => {
        this.toastr.success('Votre commande a été bien enregistrée');
        this.listproduits = [];
      }

    );

    }).catch(err =>
      console.log(err))
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51LeymeKxK5TNzzT1OfYRh4tZp1fQDwvadEFObYyRLnPwBa3Jw3r51HSstR3wyziuVUTOsaLBJSMKP1w8OFsza8Ej009sUbkWS6',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
}
