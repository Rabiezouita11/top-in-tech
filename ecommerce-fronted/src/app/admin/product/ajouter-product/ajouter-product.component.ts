import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Validations from './utils/validations';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajouter-product',
  templateUrl: './ajouter-product.component.html',
  styleUrls: ['./ajouter-product.component.css'],
})
export class AjouterProductComponent {
  //  @ViewChild('inputImage', { static: false }) inputImage!: ElementRef;
  @ViewChild('inputProduit') inputProduit!: ElementRef;
  @ViewChild('inputPrix') inputPrix!: ElementRef;
  @ViewChild('inputcategorie') inputcategorie!: ElementRef;
  @ViewChild('inputDescription') inputDescription!: ElementRef;
  @ViewChild('inputQuantite') inputQuantite!: ElementRef;

  form: FormGroup = new FormGroup({
    produit: new FormControl(''),
    Prix: new FormControl(''),
    Categories: new FormControl(''),
    Description: new FormControl(''),
    Quantite: new FormControl(''),
    Upload: new FormControl(''),
  });
  submitted = false;
  images: string[] = [];
  listCategories: any[] = [];
  selectedfiles?: FileList;
  previews: String[] = [];
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  selecteFile(event: any) {
    this.selectedfiles = event.target.files;
    if (this.selectedfiles && this.selectedfiles[0]) {
      const numberoffiles = this.selectedfiles.length;
      for (let i = 0; i < numberoffiles; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.previews.push(event.target.result);
        };
        reader.readAsDataURL(this.selectedfiles[i]);
      }
    }
  }

  ngOnInit(): void {
    // how show categories in select option ?

    this.http
      .get('/api/categories/affichercategorie')
      .subscribe((data: any) => {
        if (data.length === 0) {
          this.toastr.error('No categories found', 'Categories');
        }
        this.listCategories = data;
        console.log(this.listCategories);
      });

    this.form = this.formBuilder.group({
      produit: ['', Validators.required],
      Prix: ['', [Validators.required]],
      Categories: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Quantite: ['', Validators.required],
      Upload: ['', Validators.required],
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

    if (this.selectedfiles) {
      const nomProduit = this.inputProduit.nativeElement.value;
      const prix = this.inputPrix.nativeElement.value;
      const categorie = this.inputcategorie.nativeElement.value;
      const description = this.inputDescription.nativeElement.value;
      const quantite = this.inputQuantite.nativeElement.value;
      const formData = new FormData();
      for (let i = 0; i < this.selectedfiles.length; i++) {
        formData.append('image[]', this.selectedfiles[i]);
        console.log(formData.get('image[]'));
      }

      formData.set('nom', nomProduit);
      formData.set('prix', prix);
      formData.set('id_categorie', categorie);
      formData.set('Description', description);
      formData.set('quantite', quantite);
      this.http.post('/api/produit/ajouterProduit', formData).subscribe(
        (data: any) => {
          console.log(data);
          this.toastr.success('Produit ajouté avec succès');
          this.router.navigate(['/Listproduct']);
        },
        (error: any) => {
          if (error.status === 400) {
            this.toastr.error("Erreur lors de l'ajout du produit");
          }
        }
      );
    } else {
      this.toastr.error('image obligatoire');
    }
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}

// registerForm!: FormGroup;
// submitted = false;
//
//

//
// /*------------------------------------------
// --------------------------------------------
// Declare Form
// --------------------------------------------
// --------------------------------------------*/
//
//
// /*------------------------------------------
// --------------------------------------------
// Created constructor
// --------------------------------------------
// --------------------------------------------*/
//
// constructor(private http: HttpClient,private formBuilder: FormBuilder) { }
//
//
// get g() { return this.registerForm.controls; }
//
// onSubmit(): void {
//   this.submitted = true;
//
//   if (this.registerForm.invalid) {
//
//     return ;
//   }
//    this.affiche();
//
//
//
// }
//
// affiche(){
//   console.log("aaa");
// }

// ngOnInit() {
//   //Add User form validations
//   this.submitted = false;
//   this.registerForm = this.formBuilder.group({
//     produit: ['', [Validators.required]],
//     Prix: ['', [Validators.required]],
//     Categories: ['', [Validators.required]],
//     password: ['', [Validators.required]],
//     Description: ['', [Validators.required]],
//     Quantite: ['', [Validators.required]],
//     Upload: ['', [Validators.required]],
//
//
//   });
// }
