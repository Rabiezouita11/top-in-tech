import { Component, Inject, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    mot_de_passe: new FormControl(''),
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router , @Inject(DOCUMENT) private document: Document  , private toastr: ToastrService) { }
  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {

        email: [null, [Validators.required , Validators.email]],
        mot_de_passe: [null, [Validators.required, Validators.minLength(6)]],
      }

    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }else{

// how catch the response from the server in notifcation in angular 13 ?


try {
  this.http.post('/api/auth/login', this.form.getRawValue(), {
    withCredentials: true
  }).subscribe( (response: any) => {
    console.log(response);
    this.toastr.success('Login', 'success', {
      timeOut: 5000,
      progressAnimation: 'increasing',
      progressBar: true,
      positionClass: 'toast-top-right',
    });
    Emitters.authEmitter2.emit(true);

    if (response.x === "user") {
      this.router.navigate(['/accueil']).then(() => {
        window.location.reload();
      });

    }else if (response.x === "admin") {
      this.router.navigate(['/dashboard']);
    }



   /*  this.document.location.href = 'http://localhost:4200/accueil' */
  }, (error) => {
    console.log(error);
    if (error.status === 401 ) {
      this.toastr.error('client ban', 'error', {
        timeOut: 5000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right',




        });
    }
    if (error.status === 404 ) {
      this.toastr.error('check your email or password', 'error', {
        timeOut: 5000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'



        });
    }
    if  (error.status === 504) {
      this.toastr.warning('Server',' error', {
        timeOut: 5000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
        });
    }
    if (error.status === 500) {
      this.toastr.warning('Server error');
    }



  }
  );
 //


} catch (error) {
  // how show error in toast notification in angular 13 ?
  this.toastr.success('Hello world!', 'Toastr fun!');

  }
}

  }
}






