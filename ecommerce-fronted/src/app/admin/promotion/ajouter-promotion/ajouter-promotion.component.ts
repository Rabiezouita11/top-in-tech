import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-promotion',
  templateUrl: './ajouter-promotion.component.html',
  styleUrls: ['./ajouter-promotion.component.css']
})
export class AjouterPromotionComponent implements OnInit {
listProduitPromotion:any;
@ViewChild('inputIdproduit') inputIdproduit!: ElementRef;
@ViewChild('inputpourcentage') inputpourcentage!: ElementRef;
@ViewChild('inputdatefinpromotion') inputdatefinpromotion!: ElementRef;

form: FormGroup = new FormGroup({
  idproduit: new FormControl(''),
  pourcentage: new FormControl(''),
  promotion: new FormControl(''),

});
submitted = false;
  constructor( private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        idproduit: ['', Validators.required],
        pourcentage: ['', Validators.required],
        promotion : ['', Validators.required]

      }
      );
    this.http.get('api/promotion/afficherproduitnotInPromotion').subscribe(
      (data:any)=>{
        this.listProduitPromotion=data;
        if (data.length === 0) {
          this.toastr.error('No produit found', 'Categories');
        }
      }

    )
    console.log(this.listProduitPromotion);


  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

// get produit par id
this.http.get('api/promotion/afficherpromotionparId/'+this.inputIdproduit.nativeElement.value).subscribe(
  (data:any)=>{
console.log(data.prix);

let Promotion = {
  idproduit: this.inputIdproduit.nativeElement.value,
  pourcentage: this.inputpourcentage.nativeElement.value,
  promotion: this.inputdatefinpromotion.nativeElement.value,
  datapromotion: this.inputdatefinpromotion.nativeElement.value,
  prix: data.prix
};
this.http.put('api/promotion/ajouterPromotion', Promotion).subscribe(
  (data) => {

    this.toastr.success('Promotion Added', 'Promotion');
    this.router.navigate(['/listPromotion']);

  }
);




    }

)




  }

}
