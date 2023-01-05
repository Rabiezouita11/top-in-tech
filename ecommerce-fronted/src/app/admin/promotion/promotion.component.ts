import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
listPromtion:any;
  constructor( private toastr: ToastrService , private currentRoute: ActivatedRoute , private http:HttpClient) { }

  ngOnInit(): void {
this.http.get('api/promotion/afficherPromotion').subscribe(
  (data:any)=>{
    this.listPromtion=data;



  }
)


}
}
