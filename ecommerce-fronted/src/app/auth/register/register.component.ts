import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @ViewChild('input') input!: ElementRef;

  @ViewChild('inputPass') inputPass!: ElementRef;
  @ViewChild('inputPrenom') inputPrenom!: ElementRef;
  @ViewChild('inputnom') inputnom!: ElementRef;
  @ViewChild('inputEmail') inputEmail!: ElementRef;

  form: FormGroup = new FormGroup({
    nom: new FormControl(''),
    prenom: new FormControl(''),
    mot_de_passe: new FormControl(''),
    // confirmPassword: new FormControl(''),
    cin: new FormControl(''),
    image: new FormControl(''),
    email: new FormControl(''),
  });
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nom: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      prenom: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      mot_de_passe: [null, [Validators.required, Validators.minLength(6)]],
      // how use confirm password in angular 13 ?
      //  confirmPassword: [null, [Validators.required, Validators.minLength(6)]],

      cin: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      recaptcha: ['', Validators.required],
      // check if the email is  jpg or png or jpeg or gif or svg
      image: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  sendEmail(): void {

  }


  submit(): void {


    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {
      try {

        let email = {
          email: this.inputEmail.nativeElement.value,
          nom: this.inputnom.nativeElement.value
        }
        this.http.post('api/email', email).subscribe(
          (res: any) => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
        const imaheblob = this.fileInput.nativeElement.files[0];

        const aa = this.input.nativeElement.value;
        const bb = this.inputPass.nativeElement.value;

        const cc = this.inputPrenom.nativeElement.value;

        const dd = this.inputnom.nativeElement.value;

        const ee = this.inputEmail.nativeElement.value;

        const formData = new FormData();

        formData.set('nom', dd);
        formData.set('prenom', cc);
        formData.set('email', ee);
        formData.set('mot_de_passe', bb);
        formData.set('cin', aa);
        formData.set('image', imaheblob);
        console.log(formData.get('image'));




        this.http.post('api/auth/register', formData).subscribe(
          (response: any) => {
            console.log(response);

            this.toastr.success('inscription avec succés', 'success', {
              timeOut: 7000,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            });

            this.router.navigate(['/login']);

            /*  this.document.location.href = 'http://localhost:4200/accueil' */
          },
          (error) => {
            console.log(error);
            if (error.status === 302) {
              this.toastr.error('Email deja existe', 'error', {
                timeOut: 5000,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-right',
              });
            }
          }
        );
        this.sendEmail();

        //
      } catch (error) {
        // how show error in toast notification in angular 13 ?
        console.log(error);
      }
    }
  }

  siteKey:string ="6Ld8HIYjAAAAALw437G-L_PF1PNrNZH4Qq76MvSU";

}

