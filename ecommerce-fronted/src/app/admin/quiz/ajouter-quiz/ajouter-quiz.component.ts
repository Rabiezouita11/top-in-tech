import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {IndividualConfig, ToastrService} from "ngx-toastr";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-quiz',
  templateUrl: './ajouter-quiz.component.html',
  styleUrls: ['./ajouter-quiz.component.css']
})
export class AjouterQuizComponent implements OnInit {

  @ViewChild('inputTitreQuiz') inputTitreQuiz!: ElementRef;
  @ViewChild('inputoption1') inputoption1!: ElementRef;
  @ViewChild('inputoption2') inputoption2!: ElementRef;
  @ViewChild('inputoption3') inputoption3!: ElementRef;
  @ViewChild('inputbonnereponse') inputbonnereponse!: ElementRef;
  form: FormGroup= new FormGroup({
    option1: new FormControl(''),
    option2: new FormControl(''),
    titrequiz: new FormControl(''),
    option3: new FormControl(''),
    bonnereponse: new FormControl(''),
  });
  submitted = false;
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) { }


  ngOnInit(): void {

    this.form = this.formBuilder.group({
      option1: ['', Validators.required],
      option2: ['', [Validators.required]],
      titrequiz: ['', [Validators.required]],
      option3: ['', [Validators.required]],
      bonnereponse: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    let Quiz = {
titreQuiz : this.inputTitreQuiz.nativeElement.value,
 option1 : this.inputoption1.nativeElement.value,
 option2 : this.inputoption2.nativeElement.value,
 option3 : this.inputoption3.nativeElement.value,
 bonnereponse : this.inputbonnereponse.nativeElement.value,
    };
    if (this.inputbonnereponse.nativeElement.value == this.inputoption1.nativeElement.value || this.inputbonnereponse.nativeElement.value == this.inputoption2.nativeElement.value || this.inputbonnereponse.nativeElement.value == this.inputoption3.nativeElement.value) {







this.http.post('/api/quiz/ajouterQuiz', Quiz).subscribe(
  (response) => {
    console.log(response);
    this.router.navigate(['/ListQuiz']);
    this.toastr.success('Quiz ajouté avec succès', 'Succès', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });
  },
  (error) => {

    this.toastr.error('Erreur lors de l\'ajout du quiz', 'Erreur', {
      timeOut: 3000,
      positionClass: 'toast-top-right',
    });


  }
);
    } else {
      this.toastr.error('La bonne réponse doit être une des options', 'Erreur', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
      });
    }
  }
}


