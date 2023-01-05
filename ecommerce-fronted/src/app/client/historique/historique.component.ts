import { Component, OnInit, Renderer2 } from '@angular/core';
import { ScriptService } from './../../Service/script/script.service';
const SCRIPT_PATH_LIST = ['assets/client/js/script.js'];
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  constructor(  private ScriptServiceService: ScriptService,  private renderer: Renderer2,) { }

  ngOnInit(): void {
    SCRIPT_PATH_LIST.forEach(e=> {
      const scriptElement = this.ScriptServiceService.loadJsScript(this.renderer, e);
      scriptElement.onload = () => {
        console.log('loaded');

      }
      scriptElement.onerror = () => {
        console.log('Could not load the script!');
      }

    });

  }

}
