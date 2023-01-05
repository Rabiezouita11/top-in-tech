import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  listQuiz: any;
  constructor(
    private toastr: ToastrService,
    private currentRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get('api/quiz/afficherQuiz').subscribe((data: any) => {
      this.listQuiz = data;
    });
  }

  delete(id :number) {
    // how confirm delete in angular 13 ? with sweetalert2  ?

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete('api/quiz/deleteQuiz' +'/'+id).subscribe(() => {
          this.ngOnInit();
          this.toastr.info('Quiz deleted successfully', 'Quiz deleted');
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        });
      }
    });
  }
}
