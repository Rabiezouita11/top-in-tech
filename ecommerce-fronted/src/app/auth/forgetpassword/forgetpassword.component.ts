import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './../../Service/category/category.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent implements OnInit {
  @ViewChild('inputEmail') inputEmail!: ElementRef;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
  });
  submitted = false;
  constructor(
    private currentRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    } else {

        this.http
          .post('/api/auth/postforgot-password', this.form.getRawValue(), {
            withCredentials: true,
          })
          .subscribe((response: any) => {
            console.log(response);
            this.toastr.success('Email', 'Email envoyé', {
              timeOut: 5000,
              progressAnimation: 'increasing',
              progressBar: true,
            });
          
          }, (error) => {
            if (error.status === 404) {
              this.toastr.error('Email', 'Email introuvable', {
                timeOut: 5000,
                progressAnimation: 'increasing',
                progressBar: true,
              });
            }


        } );

    }
  }
}

