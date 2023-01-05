import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-changermotdepasee',
  templateUrl: './changermotdepasee.component.html',
  styleUrls: ['./changermotdepasee.component.css'],
})
export class ChangermotdepaseeComponent implements OnInit {

  @ViewChild('inputpassword') inputpassword!: ElementRef;
  @ViewChild('inputneuveaupassword') inputneuveaupassword!: ElementRef;
  @ViewChild('inputconfirmerpassword') inputconfirmerpassword!: ElementRef;
  @ViewChild('xx') xx!: ElementRef;
id!: number;
  bb: FormGroup = new FormGroup({
    password: new FormControl(''),
    newpassword: new FormControl(''),
    confirmpassword: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  submit(): void {
    this.submitted = true;

    if (this.bb.invalid) {
      return;
    } else {
      let User = {
        id :  this.xx.nativeElement.value,
        password: this.inputpassword.nativeElement.value,
        newpassword:  this.inputneuveaupassword.nativeElement.value,
      };


if (this.inputneuveaupassword.nativeElement.value == this.inputconfirmerpassword.nativeElement.value) {




      console.log(User);
      this.http.put('api/auth/change',User).subscribe(
          (res: any) => {

            console.log(res);
            if (res.status == 'success') {
              this.toastr.success('Password changed successfully');
              this.router.navigate(['/profileClient']);
            } else if (res.status == 'error') {
              this.toastr.error('User not found');
            } else if (res.status == 400) {
              this.toastr.error('Wrong password');
            }
          },
          (err) => {
            this.toastr.error(err.error.message);
          }
        );
} else {
  this.toastr.error('Password does not match');

    }
  }
  }
  ngOnInit(): void {




    this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
      (res: any) => {



        this.id = res.id;
        // this.message = `${this.api+res.image}`;
        // how show image in toast angular 13 ?



      },
      err => {


      }
    );

  }
  get f(): { [key: string]: AbstractControl } {
    return this.bb.controls;
  }


}
