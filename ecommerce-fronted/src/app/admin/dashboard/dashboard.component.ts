import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Loader } from '@googlemaps/js-api-loader';
import { ChartType } from 'chart.js';
import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  produit: any;
  commande: any;
  quiz: any;
  contact: any;
  datasets: any;
  labels: any;
  x: number = 0;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartType: ChartType = 'pie';
  public barChartLegend = true;

  // public barChartLabels= ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
  // public barChartData = {data: [70,80,90], label: 'IMC'};

  constructor(
    private toastr: ToastrService,
    private currentRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  getProduit(idprdouits: number) {
    this.http
      .get('api/totale/afficheRate' + '/' + idprdouits)
      .subscribe((data: any) => {
        console.log('rabie');

        for (let i = 0; i < data.length; i++) {
          this.x += parseInt(data[i].noter) / data.length;
        }

        this.datasets = [
          {
            label: 'Traffic',
            data: [this.x],
            backgroundColor: [
              'rgba(63, 81, 181, 0.5)',
              'rgba(77, 182, 172, 0.5)',
              'rgba(66, 133, 244, 0.5)',
              'rgba(156, 39, 176, 0.5)',
              'rgba(233, 30, 99, 0.5)',
              'rgba(66, 73, 244, 0.4)',
              'rgba(66, 133, 244, 0.2)',
            ],
          },
        ];
        this.labels = [data[1].produit.nom];
      });
  }

  ngOnInit() {




    this.getProduit(2);

    // this.http.get('api/totale/afficheRate' + '/'+ 2).subscribe(
    //   (data:any)=>{
    //     console.log('***********************')
    //     console.log([data])

    //     this.datasets = [
    //       {
    //         label: 'Traffic',
    //         data:data.map((item:any)=>item.noter),
    //         backgroundColor: [
    //           'rgba(63, 81, 181, 0.5)',
    //           'rgba(77, 182, 172, 0.5)',
    //           'rgba(66, 133, 244, 0.5)',
    //           'rgba(156, 39, 176, 0.5)',
    //           'rgba(233, 30, 99, 0.5)',
    //           'rgba(66, 73, 244, 0.4)',
    //           'rgba(66, 133, 244, 0.2)',
    //         ],
    //       },
    //     ];
    //     this.labels = data.map((item:any)=>item.produit.nom );

    //   });

    let loader = new Loader({
      apiKey: 'AIzaSyDFK8e9zS74Z-dr_Om8a0sPGUPAepAlMp4',
    });

    loader.load().then(() => {
      let map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: 36.81897, lng: 10.16579 },
        zoom: 8,
      });

      this.http
        .get('api/commandeAdmin/affichercommande')
        .subscribe((data: any) => {
          console.log('***********************');
          console.log(data);
          console.log('***********************');
          for (let i = 0; i < data.length; i++) {
            new google.maps.Marker({
              position: { lat: data[i].lat, lng: data[i].lng },
              map: map,
              title: 'tunis!',
            });
          }
        });
    });

    this.http.get('api/totale/countContact').subscribe((data: any) => {
      this.contact = data;
      if (data.length === 0) {
        this.toastr.error('No contact found', 'contact');
      }
    }),
      this.http.get('api/totale/countQuiz').subscribe((data: any) => {
        this.quiz = data;
        if (data.length === 0) {
          this.toastr.error('No quiz found', 'quiz');
        }
      }),
      this.http.get('api/totale/countCommande').subscribe((data: any) => {
        this.commande = data;
        if (data.length === 0) {
          this.toastr.error('No commande found', 'commande');
        }
      }),
      this.http.get('api/totale/countProduit').subscribe((data: any) => {
        this.produit = data;
        if (data.length === 0) {
          this.toastr.error('No produit found', 'produit');
        }
      });
  }
}
