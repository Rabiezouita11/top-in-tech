import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ScriptService } from './../../../Service/script/script.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(   private router: Router,
    private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private http: HttpClient,
    private toastr: ToastrService,
    private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.currentRoute.snapshot.paramMap.get('id');
    this.http.get('api/checkout/getorders/' + id).subscribe((data: any) => {
      console.log(data);
    }
    );

  }

}
