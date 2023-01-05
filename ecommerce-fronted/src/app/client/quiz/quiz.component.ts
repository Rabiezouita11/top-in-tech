import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {MDCRadio} from '@material/radio';
import { ScriptService } from './../../Service/script/script.service';
import { AbstractControl, FormGroup, FormControl } from '@angular/forms';
const SCRIPT_PATH_LIST = ["assets/client/js/script.js"];
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  listQuiz: any;
  message: any;
  submitted = false;
  @ViewChild('inputquiz1') inputquiz1!: ElementRef;
  @ViewChild('inputquiz2') inputquiz2!: ElementRef;
  @ViewChild('inputquiz3') inputquiz3!: ElementRef;

  constructor(private http: HttpClient,  private renderer: Renderer2,
    private ScriptServiceService: ScriptService,) { }

  ngOnInit(): void {
    this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
      (res: any) => {
        this.message = res.id;
        // this.message = `${this.api+res.image}`;
        // how show image in toast angular 13 ?


      },
      (err) => {
        console.log(err);
      }
    );
    SCRIPT_PATH_LIST.forEach((e) => {
      const scriptElement = this.ScriptServiceService.loadJsScript(
        this.renderer,
        e
      );
      scriptElement.onload = () => {


        console.log('loaded');
      };
      scriptElement.onerror = () => {
        console.log('Could not load the script!');
      };
    });
    this.http.get('api/quiz/afficherQuiz').subscribe((data: any) => {
      this.listQuiz = data;
      console.log(this.listQuiz);
    });
  }


  quiz(idquiz: any , iduser: any , idquiz1: any , idquiz2: any , idquiz3: any ) {


if (idquiz1 == true) {
  let Quiz = {
    id_quiz: idquiz,
    id_user: iduser,
    reponse: this.inputquiz1.nativeElement.value,
  
  }
  this.http.post('api/quiz/checkreponse', Quiz).subscribe((data: any) => { 
    console.log(data);
  });

  this.ngOnInit();

  }
  if (idquiz2 == true) {
    let Quiz = {
      id_quiz: idquiz,
      id_user: iduser,
      reponse: this.inputquiz2.nativeElement.value,
    
    }
    
    this.http.post('api/quiz/checkreponse', Quiz).subscribe((data: any) => { 
      console.log(data);
    });
    this.ngOnInit();

    }
    if (idquiz3 == true) {
      let Quiz = {
        id_quiz: idquiz,
        id_user: iduser,
        reponse: this.inputquiz3.nativeElement.value,
      
      }
      this.http.post('api/quiz/checkreponse', Quiz).subscribe((data: any) => { 
        console.log(data);
      });
      this.ngOnInit();
      }

}
}
