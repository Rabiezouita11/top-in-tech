import { Component, OnInit, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Service/category/category.service';
import { categories } from './../../../Models/categories';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-ajouter-category',
  templateUrl: './ajouter-category.component.html',
  styleUrls: ['./ajouter-category.component.css']
})

export class AjouterCategoryComponent  {
  @ViewChild('inputimage', { static: false }) inputimage!: ElementRef;
  @ViewChild('inputdeletedimage') inputdeletedimage!: ElementRef;

  @ViewChild('inputnom') inputnom!: ElementRef;
  urlimage !: string;
  public categorie !:categories;
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    Image: new FormControl(''),
    inputdelete: new FormControl(''),
  });
  x !: string;
  submitted = false;
  validationImage = "erreur";
  public action !: string;
  constructor(private cookieService: CookieService,private currentRoute: ActivatedRoute , private router: Router, private toastr: ToastrService, private categoriesService:CategoryService,  private formBuilder: FormBuilder ,  private http: HttpClient) { }

  ngOnInit(): void {




    let id = this.currentRoute.snapshot.params['id'];
    if (id != null) {
      this.form = this.formBuilder.group(
        {
          name: ['', Validators.required],
          Image: ['', Validators.required],
          inputdelete : ['']

        }
        );
     this.action = "modifier";
// how add with header in url




      this.categoriesService.getCategoryById(id).subscribe(
        (data) => {
          this.categorie = data;
          this.form.controls['name'].setValue(this.categorie.name);
          this.urlimage = '/api/'+this.categorie.Image;

          // replace with regex to remove the first part of the url and keep the rest of it

          this.x = this.categorie.Image.replace('public\\caetgory\\', '');
          console.log(this.x);


        //  this.x = this.categorie.Image.replace("public/caetgory/", "/");
          this.form.controls['inputdelete'].setValue(this.x);
        }
      )
    }else{

      this.action = "save";
      this.form = this.formBuilder.group(
        {
          name: ['', Validators.required],
          Image: ['', Validators.required],

        }
        );
    }





  }


  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {


if(this.action=="save"){

  this.submitted = true;

  if (this.form.invalid) {
    return;
  }
  const image = this.inputimage.nativeElement.files[0];

  const nom = this.inputnom.nativeElement.value;


  const formData = new FormData();

  formData.set('Image', image);
  formData.set('name', nom);







this.categoriesService.addCategory(formData).subscribe(
(data : any)=>{





  console.log(data);
  this.toastr.success('ajouter avec succés', 'success', {
    timeOut: 5000,
    progressAnimation: 'decreasing',
    progressBar: true,
    positionClass: 'toast-top-right',
  });
  this.router.navigate(['/category']);

  if (data.error) {
    this.toastr.error('erreur', 'error', {
      timeOut: 5000,
      progressAnimation: 'decreasing',
      progressBar: true,
      positionClass: 'toast-top-right',
    });
  }
}
)
}else{
  this.submitted = true;
  const image = this.inputimage.nativeElement.files[0];



  const nom = this.inputnom.nativeElement.value;
  const formData = new FormData();

  formData.set('Image', image);
  formData.set('name', nom);
  let id = this.currentRoute.snapshot.params['id'];

// const inputdeletedimage = this.inputdeletedimage.nativeElement.files[0];
// const formData2 = new FormData();
// formData2.set('photo', inputdeletedimage);
// console.log(inputdeletedimage);
// this.http.delete('/api/deletd/remove', { params: inputdeletedimage }).subscribe(
//   (data) => {
//     console.log(data);
//   }

// )


this.categoriesService.updateCategory(id,formData).subscribe(
  (data)=>{
    console.log(data);
    this.toastr.success('modifier avec succés', 'success', {
      timeOut: 5000,
      progressAnimation: 'decreasing',
      progressBar: true,
      positionClass: 'toast-top-right',
    });
    this.router.navigate(['/category']);
  }
)






}







}
}
