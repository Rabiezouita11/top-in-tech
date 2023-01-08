import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptService } from './../../Service/script/script.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';
import { CookieService } from 'ngx-cookie-service';
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {
  @ViewChild('inputMessage') inputMessage!: ElementRef;
  message: any;
  list: any;


  constructor( private renderer: Renderer2,
    private router: Router,
    private ScriptServiceService: ScriptService,
    private http: HttpClient,
    private toastr: ToastrService,
    private SocketIOServiceService: SocketIOServiceService,
    private cookieService: CookieService) {
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

  ngOnInit(): void {


    this.http.get('api/avis/afficher', { withCredentials: true }).subscribe(
      (res: any) => {
        console.log(res);
        this.list = res;
        this.SocketIOServiceService.listen('listavis').subscribe((data: any) => {
          console.log(data);
          this.list = [];
          this.list = data;
       
      
      });
      },
      
      (err) => {
        this.toastr.error( err.error.error , 'Erreur'  , {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });

      }
    );


  }

  ajouter() {
console.log(this.inputMessage.nativeElement.value);
console.log(this.message);
this.http.post('api/avis/ajouter', {comment: this.inputMessage.nativeElement.value, id_user: this.message}, { withCredentials: true }).subscribe(
  (res: any) => {
    console.log(res);
    this.toastr.success('Avis ajouté avec succès');
    this.inputMessage.nativeElement.value = '';
    this.ngOnInit();
  },
  (err) => {
    this.toastr.error( err.error.error , 'Erreur'  , {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });


  }
);
  }

}
