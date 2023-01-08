import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptService } from './../../Service/script/script.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../header/header.component';
import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  listProduit: any;
  totalePrixPanier: any;
  authenticated = false;
  quantites : any;
@ViewChild('inputnumber') inputnumber!: ElementRef;
  idproduit!: number;
  nomproduit!: string;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private http: HttpClient,
    private toastr: ToastrService,
    private SocketIOServiceService : SocketIOServiceService
  ) {}




  ngOnInit(): void {


    try {
      this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
        (user: any) => {
          this.authenticated = true;

          const id = user.id;
          this.http
            .get('api/panier/afficherPanierparId/' + id)
            .subscribe((data: any) => {
              this.listProduit = data;
            }),
            this.http.get('api/panier/totaleprixpanier/'+id).subscribe(
              (data:any)=>{

                this.totalePrixPanier=data;
                console.log(this.totalePrixPanier);

            });
        }
      );
    } catch (error) {
      this.authenticated = false;
    }





  }


update( ){
  const quantite = this.inputnumber.nativeElement.value;
console.log(quantite);

 if (this.inputnumber.nativeElement.value == '') {
  this.toastr.error('quantite invalide');
 }else{



console.log('***********************************');
console.log(this.idproduit);
  this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
    (user: any) => {
      this.authenticated = true;

      const id = user.id;

      this.http.put('api/panier/updatePanier', {id,quantite,idProduit : this.idproduit}).subscribe(
    (data:any)=>{


      this.toastr.success('Produit update avec succès');


this.ngOnInit();




        }, (error) => {
          this.toastr.error('produit hors stock');
        }

      )
    }
  )
}
}







hassen(idProduit:number , nom : string){
this.nomproduit = nom;
this.idproduit = idProduit;

}










  deletePanier(idProduit:number){

    this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
      (user: any) => {
        this.authenticated = true;

        const id = user.id;


    this.http.delete('api/panier/deletePanier/'+id +'/'+idProduit).subscribe(
      (data:any)=>{
        this.toastr.success('Produit supprimé avec succès');
        this.http.get('api/panier/afficherPanierparId/'+idProduit).subscribe(
          (data:any)=>{
            this.listProduit=data;
            this.SocketIOServiceService.emit('idusercountprdouit', id);
      this.ngOnInit();
          }
        )
      }
    )
  }
    )


  }
}



