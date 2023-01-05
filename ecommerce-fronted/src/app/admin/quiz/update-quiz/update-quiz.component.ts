import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/Service/category/category.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

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
  constructor(private currentRoute: ActivatedRoute , private router: Router, private toastr: ToastrService, private categoriesService:CategoryService,  private formBuilder: FormBuilder ,  private http: HttpClient) { }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngOnInit(): void {

    let id = this.currentRoute.snapshot.params['id'];
    if (id != null) {
      this.http.get('/api/quiz/findQuizbyId/' + id).subscribe(
        (response : any) => {
          console.log(response);
          this.inputTitreQuiz.nativeElement.value = response['titre_quiz'];
          this.inputoption1.nativeElement.value = response['option1'];
          this.inputoption2.nativeElement.value = response['option2'];
          this.inputoption3.nativeElement.value = response['option3'];
          this.inputbonnereponse.nativeElement.value = response['bonne_reponse'];
        },
        (error) => {
          console.log(error);
        }
      );
    }



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


console.log(Quiz);
let id = this.currentRoute.snapshot.params['id'];
this.http.put('/api/quiz/updateQuiz/'+id, Quiz).subscribe(
(response) => {
  console.log(response);
  this.router.navigate(['/ListQuiz']);
  this.toastr.success('Quiz Modifier avec succès', 'Succès', {
    timeOut: 3000,
    positionClass: 'toast-top-right',
  });
},
(error) => {

 if (error.status === 400) {
   this.toastr.error('Quiz non Modifier', 'Erreur', {
     timeOut: 3000,
     positionClass: 'toast-top-right',
   });
 }


}
);
}

}

