import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SocketIOServiceService } from './../../Service/SocketIOService/socket-ioservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticated = false;
  listCommande : any =   []   
  constructor(private http:HttpClient, private router:Router , private SocketIOServiceService: SocketIOServiceService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.SocketIOServiceService.listen('commandeAdmin').subscribe((data : any) => {
console.log(data);
    this.toastr.success(data.user.nom, 'nouvelle commande');
    this.listCommande.push(data); 
    }
    );
  }
  logout(): void {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, déconnecter!'
    }).then((result) => {
      if (result.isConfirmed) {



    this.http.post('/api/auth/logout', {}, {withCredentials: true})
      .subscribe(() => this.authenticated = false);
      this.router.navigate(['/accueil']  ).then(() => {
        window.location.reload();
      }
      );


  }
});
}

}
