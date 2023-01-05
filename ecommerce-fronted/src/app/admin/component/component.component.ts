import { ScriptService } from './../../Service/script/script.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { SocketIOServiceService } from './../../Service/SocketIOService/socket-ioservice.service';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {

  constructor( private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private toastr: ToastrService,
    private SocketIOServiceService : SocketIOServiceService) { }

    ngOnInit() {
      this.SocketIOServiceService.listen('produit').subscribe((data: any) => {
        console.log(data);
        this.toastr.success('Un nouveau produit a été ajouté', data.produit, {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        });
      });


      SCRIPT_PATH_LIST.forEach(e=> {
        const scriptElement = this.ScriptServiceService.loadJsScript(this.renderer, e);
        scriptElement.onload = () => {
         console.log('loaded');

        }
        scriptElement.onerror = () => {
          console.log('Could not load the script!');
        }

      })

    }

}
