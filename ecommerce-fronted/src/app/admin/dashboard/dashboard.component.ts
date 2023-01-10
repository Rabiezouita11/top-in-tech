import { Component, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Loader } from '@googlemaps/js-api-loader';
import * as Chart from 'chart.js';

import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';

const SCRIPT_PATH_LIST =[
  "../../../assets/admin/js/jquery-3.3.1.min.js",


  "assets/admin/js/bootstrap.bundle.min.js",


  "assets/admin/js/icons/feather-icon/feather.min.js",
  "assets/admin/js/icons/feather-icon/feather-icon.js",


  "assets/admin/js/sidebar-menu.js",








  "assets/admin/js/lazysizes.min.js",

  "assets/admin/js/prism/prism.min.js",
  "assets/admin/js/clipboard/clipboard.min.js",
  "assets/admin/js/custom-card/custom-card.js",


  "assets/admin/js/counter/jquery.waypoints.min.js",
  "assets/admin/js/counter/jquery.counterup.min.js",
  "assets/admin/js/counter/counter-custom.js",


  "assets/admin/js/chart/peity-chart/peity.jquery.js",


  "https://cdn.jsdelivr.net/npm/apexcharts",


  "assets/admin/js/chart/sparkline/sparkline.js",





  "assets/admin/js/dashboard/default.js",


  "assets/admin/js/chat-menu.js",


  "assets/admin/js/height-equal.js",


  "assets/admin/js/lazysizes.min.js",


  "assets/admin/js/admin-script.js",
  ]


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
  public barChartType: Chart.ChartType = 'pie';
  public barChartLegend = true;
  chart: any;
  numConnectedClients: any;

  // public barChartLabels= ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
  // public barChartData = {data: [70,80,90], label: 'IMC'};

  constructor(
    private toastr: ToastrService,
    private currentRoute: ActivatedRoute,
    private http: HttpClient,
    private SocketIOServiceService : SocketIOServiceService
  ) {


  }



  ngOnInit( ) {

 
 
        // refresh the chart every 5 seconds 
    

this.SocketIOServiceService.emit('xx', 'xx');
 

        
    this.chart = new Chart.Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Number of Active Clients',
          data: [],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(255, 99, 132)',
        }]
      },
    
    });
   

    this.SocketIOServiceService.listen('active-clients-changed').subscribe((data:any)=>{
      console.log('chart'+data.numConnectedClients);
      this.chart.data.labels.push(data.date);
      this.chart.data.datasets[0].data.push(data.numConnectedClients);
      this.chart.update();
   
    })


 

    // this.getProduit(2);

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
