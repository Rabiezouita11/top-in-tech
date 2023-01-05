import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ScriptService } from '../../Service/script/script.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

const SCRIPT_PATH_LIST = [
  'assets/client/js/jquery-3.3.1.min.js',

  'assets/client/js/menu.js',

  'assets/client/js/lazysizes.min.js',

  'assets/client/js/price-range.js',

  'assets/client/js/slick.js',

  'assets/client/js/bootstrap.bundle.min.js',

  'assets/client/js/bootstrap-notify.min.js',

  'assets/client/js/theme-setting.js',
  'assets/client/js/script.js',
];
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  nom: any;
  email: any;
  @ViewChild('inputmessage') inputmessage!: ElementRef;
  @ViewChild('inputnom') inputnom!: ElementRef;
  @ViewChild('inputemail') inputemail!: ElementRef;

  form: FormGroup = new FormGroup({
    message: new FormControl(''),
  });
  submitted = false;
  constructor(
    private renderer: Renderer2,
    private ScriptServiceService: ScriptService,
    private http: HttpClient,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.http.get('api/auth/getUser', { withCredentials: true }).subscribe(
      (res: any) => {
        this.nom = res.nom;
        this.email = res.email;
      },
      (err) => {
        console.log(err);
      }
    );

    // how to listen to an event from the server side

    // this.socket.on('message-broadcast', (data: string) => {
    //   console.log(data);
    // });

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
    this.form = this.formBuilder.group({
      message: ['', Validators.required],
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

let contactss = {
  nom: this.inputnom.nativeElement.value,
  email: this.inputemail.nativeElement.value,
  message:  this.inputmessage.nativeElement.value,
};




this.http.post('api/ContactClient/ajoutercontact', contactss).subscribe(
  (res: any) => {
    this.toastr.success('Message envoyé avec succés' , 'Succés');
    // how reset the form after submit it and clear the input fields
    this.form.reset();


  },
  (err) => {
    console.log(err);

    this.toastr.error('Erreur');
  }
);




  }
}
