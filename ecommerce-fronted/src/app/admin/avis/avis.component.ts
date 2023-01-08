import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.css']
})
export class AvisComponent implements OnInit {
  list: any;

  constructor(private renderer: Renderer2,
    private router: Router,

    private http: HttpClient,
    private toastr: ToastrService,
    private SocketIOServiceService: SocketIOServiceService) { }

  ngOnInit(): void {
    this.http.get('api/avis/afficher', { withCredentials: true }).subscribe(
      (res: any) => {
        console.log(res);
        this.list = res;
      },
      (err) => {
        this.toastr.error( err.error.error , 'Erreur'  , {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });

      }
    );

  }
  Signaler(id: any , idUser : any) {
console.log(idUser);

Swal  .fire({
  title: 'Signaler',
  text: 'Voulez-vous vraiment signaler cet avis ?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Oui, Signaler !'
}).then((result: { isConfirmed: any; }) => {
  if (result.isConfirmed) {
    this.http.put('api/avis/signaler/' + id, { withCredentials: true }).subscribe(
      (res: any) => {
        console.log(res);
        this.list = res;
        Swal.fire(
          'Signaler!',
          'Cet avis a été signaler.',
          'success'
        )
        this.ngOnInit();
          this.SocketIOServiceService.emit('singleavis', { idUser: idUser , id : id} );

      },
      
      (err) => {
        this.toastr.error( err.error.error , 'Erreur'  , {
          timeOut: 3000,
          positionClass: 'toast-top-right',
        });

      }
    );
  }
})

  }
  
}
