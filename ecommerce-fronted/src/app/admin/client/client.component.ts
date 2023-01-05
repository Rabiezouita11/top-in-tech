import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SocketIOServiceService } from 'src/app/Service/SocketIOService/socket-ioservice.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  @ViewChild('inputId') inputId!: ElementRef;
listClient : any;
  constructor(private toastr: ToastrService , private currentRoute: ActivatedRoute , private http:HttpClient,  private SocketIOServiceService : SocketIOServiceService) { }

  ngOnInit(): void {
    this.http.get('api/clientAdmin/afficherclient').subscribe(
      (data:any)=>{
        this.listClient=data;

        if (data.length === 0) {
          this.toastr.error('No client found', 'Client');
        }
      }

    )
  }

  inactive(id :number) {
    // how confirm delete in angular 13 ? with sweetalert2  ?

        this.http.put('api/clientAdmin/banuser/'+id,{}).subscribe(
          (data:any)=>{
console.log(data.message);
if (data.message === 'userr banned') {

            this.toastr.error('Client baned successfully', 'Client');

    this.SocketIOServiceService.emit('message', id);
}else
{
  this.toastr.success('Client not baned', 'Client');

  this.SocketIOServiceService.emit('message', id);
}

            this.ngOnInit();
          }
        )


      }



}
