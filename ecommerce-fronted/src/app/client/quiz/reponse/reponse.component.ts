import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css'],
})
export class ReponseComponent implements OnInit {
  @ViewChild('inputquiz1') inputquiz1!: ElementRef;
  @ViewChild('inputquiz2') inputquiz2!: ElementRef;
  @ViewChild('inputquiz3') inputquiz3!: ElementRef;

  quiz1: any;
  quiz2: any;
  quiz3: any;
  titrequiz: any;
  idquiz: any;
  message: any;
  idUser!: string;
  reponse: any;
  bonnereponse: any;
  correctreponse: any;

  constructor(
    private currentRoute: ActivatedRoute,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.currentRoute.snapshot.params['id'];

    this.http.get('/api/quiz/findQuizbyId/' + id).subscribe(
      (response: any) => {
        console.log(response);
        this.quiz1 = response.option1;
        this.quiz2 = response.option2;
        this.quiz3 = response.option3;
        this.titrequiz = response.titre_quiz;
        this.idquiz = id;
      },
      (error) => {
        console.log(error);
      }
    );

    this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
      (res: any) => {
        this.message = res.id;
        this.idUser = res.id;
        // this.message = `${this.api+res.image}`;
        // how show image in toast angular 13 ?

        this.http
          .get('api/quiz/findQuizbyIdquizandIduser' + '/' + res.id + '/' + id)
          .subscribe(
            (response: any) => {
              this.reponse = response.reponse;
              console.log('reponse************************************');
              console.log(this.reponse);

              this.http
                .get('api/quiz/checkreponsebyidquiz' + '/' + res.id + '/' + id)
                .subscribe(
                  (response: any) => {
                    console.log(
                      'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
                    );
                    console.log(response.correct);
                    console.log(response.coupon);
                    if (response.message == 'reponse correct') {
                      this.toastr.success('Bravo', 'Bonne réponse vous avez gagné coupoun valable 1 jours  ', {
                        timeOut: 5000,
                        positionClass: 'toast-top-center',
                        closeButton: true,
                        progressBar: true,
                      });
                      this.bonnereponse = 'bonne reponse';
                    } else {
                      this.toastr.error('Dommage', 'Mauvaise réponse', {
                        timeOut: 5000,
                        positionClass: 'toast-top-center',
                        closeButton: true,
                        progressBar: true,
                      });
                      this.bonnereponse = 'Mauvaise réponse';
                      this.correctreponse = response.correct;
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            },
            (error) => {
              console.log(error);
            }
          );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  quiz(idquiz: any, iduser: any, idquiz1: any, idquiz2: any, idquiz3: any) {
    let id = this.currentRoute.snapshot.params['id'];
    if (idquiz1 == false && idquiz2 == false && idquiz3 == false) {
      this.toastr.error('erreur', 'Veuillez choisir une réponse', {
        timeOut: 5000,
        positionClass: 'toast-top-center',
        closeButton: true,
        progressBar: true,
      });
    }
    if (idquiz1 == true) {
      let Quiz = {
        id_quiz: idquiz,
        id_user: iduser,
        reponse: this.inputquiz1.nativeElement.value,
      };
      this.http.post('api/quiz/checkreponse', Quiz).subscribe((data: any) => {
        console.log(data);
        if (data.message == 'reponse correct') {
          this.toastr.success('Bravo', 'Bonne réponse', {
            timeOut: 5000,
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
          });
        } else {
          this.toastr.error('Dommage', 'Mauvaise réponse', {
            timeOut: 5000,
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
          });
        }
        this.router.navigate(['/Quiz/' + id]).then(() => {
          window.location.reload();
        });
      });
    }
    if (idquiz2 == true) {
      let Quiz = {
        id_quiz: idquiz,
        id_user: iduser,
        reponse: this.inputquiz2.nativeElement.value,
      };

      this.http.post('api/quiz/checkreponse', Quiz).subscribe((data: any) => {
        if (data.message == 'reponse correct') {
          this.toastr.success('Bravo', 'Bonne réponse', {
            timeOut: 5000,
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
          });
        } else {
          this.toastr.error('Dommage', 'Mauvaise réponse', {
            timeOut: 5000,
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
          });
        }
        this.router.navigate(['/Quiz/' + id]).then(() => {
          window.location.reload();
        });
      });
    }
    if (idquiz3 == true) {
      let Quiz = {
        id_quiz: idquiz,
        id_user: iduser,
        reponse: this.inputquiz3.nativeElement.value,
      };
      this.http.post('api/quiz/checkreponse', Quiz).subscribe((data: any) => {
        if (data.message == 'reponse correct') {
          this.toastr.success('Bravo', 'Bonne réponse', {
            timeOut: 5000,
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
          });
        } else {
          this.toastr.error('Dommage', 'Mauvaise réponse', {
            timeOut: 5000,
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
          });
        }
        this.router.navigate(['/Quiz/' + id]).then(() => {
          window.location.reload();
        });
      });
    }
  }
}
