import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
listConatct : any;
  constructor( private SocketIOServiceService : SocketIOServiceService , private toastr: ToastrService , private currentRoute: ActivatedRoute , private http:HttpClient) { }

  ngOnInit(): void {


    this.http.get('api/ContactAdmin/affichercontact').subscribe(
      (data:any)=>{

        this.listConatct=data;
        if (data.length === 0) {
          this.toastr.error('No contact found', 'Contact');
        }
      }

    )
  }


}
