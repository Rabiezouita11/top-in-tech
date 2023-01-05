import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ComponentClientComponent } from './../component-client/component-client.component';
import { ScriptService } from './../../Service/script/script.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitters/emitter';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('inputimage', { static: false }) inputimage!: ElementRef;
  @ViewChild('inputnom') inputnom!: ElementRef;

  @ViewChild('inputPass') inputPass!: ElementRef;
  @ViewChild('inputprenom') inputprenom!: ElementRef;
  @ViewChild('inputEmail') inputEmail!: ElementRef;
  @ViewChild('inputcin') inputcin!: ElementRef;
  @ViewChild('inputid') inputid!: ElementRef;

  authenticated = false;
  nom: string = '';
  prenom: string = '';
  cin: string = '';
  image: string = '';
  email: string = '';
  id: string = '';
  date: string = '';
  message: string = '';
  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  update(): void {
    const image = this.inputimage.nativeElement.files[0];
    const nom = this.inputnom.nativeElement.value;
    const prenom = this.inputprenom.nativeElement.value;
    const cin = this.inputcin.nativeElement.value;
    const email = this.inputEmail.nativeElement.value;
    const id = this.inputid.nativeElement.value;
    const formData = new FormData();

    formData.set('image', image);
    formData.set('nom', nom);
    formData.set('prenom', prenom);
    formData.set('cin', cin);
    formData.set('email', email);
    formData.set('id', id);
    console.log(formData.get('image'));
    this.http.put('api/auth/UpdateProfileUser', formData).subscribe(
      (res) => {
        this.toastr.success('Profile updated successfully');
        this.ngOnInit();
        this.reset();
      },
      (err) => {
        this.toastr.error('Profile updated failed');
      }
    );
  }
  reset() {
    console.log(this.inputimage.nativeElement.files);
    this.inputimage.nativeElement.value = '';
    console.log(this.inputimage.nativeElement.files);
  }
  delete(): void {
    Swal.fire({
      title: 'vous etes sure de supprimer votre compte?',
      text: '10 jours apres la suppression de votre compte vous ne pourrez plus le recuperer !!  ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprimer!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        const id = this.inputid.nativeElement.value;
        let Compte = {
          id: this.inputid.nativeElement.value,
        };
        console.log(id);
        this.http.put('api/auth/delete/', Compte).subscribe(
          (res) => {
            this.toastr.success('Profile en cours de suppression');
            this.router.navigate(['/profileClient']);
            this.ngOnInit();
          },
          (err) => {
            this.toastr.error('Profile deleted failed');
          }
        );
      }
    });
  }

  ngOnInit(): void {
    let currentDateTime = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    console.log(currentDateTime);

    this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
      (res: any) => {
        let str = 'http://localhost:4200/' + 'api' + '/' + res.image;
        this.nom = res.nom;
        this.prenom = res.prenom;
        this.cin = res.cin;
        this.image = str;
        this.email = res.email;
        this.id = res.id;
        this.date = res.date_supprimer_compte;

        let currentDateTime = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
        console.log(currentDateTime);
        let date = moment(this.date).format('YYYY-MM-DD');
        console.log(date);
        let diff = moment(date).diff(moment(currentDateTime), 'days');
        this.message =
          'il vous reste ' + diff + ' jours pour supprimer votre compte';
        // this.message = `${this.api+res.image}`;
        // how show image in toast angular 13 ?

        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
      }
    );
  }

  recupere(): void {
    const id = this.inputid.nativeElement.value;
    let Compte = {
      id: this.inputid.nativeElement.value,
    };
    console.log(id);
    this.http.put('api/auth/RecupererCompte/', Compte).subscribe(
      (res) => {
        this.toastr.success('Profile recuperer avec succes');
        this.router.navigate(['/profileClient']);
        this.ngOnInit();
      },
      (err) => {
        this.toastr.error('Profile recuperer failed');
      }
    );
  }
}
