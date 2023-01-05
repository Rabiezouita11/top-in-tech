import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../../Service/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor( private toastr: ToastrService , private currentRoute: ActivatedRoute , private http:HttpClient) { }
listproduit:any;
  ngOnInit(): void {
    this.http.get('api/produit/afficherAllProduitwithnameCategorie').subscribe(
      (data:any)=>{
        this.listproduit=data;

      }
    )
    console.log(this.listproduit);
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
        this.http.delete('api/produit/deleteProduit' +'/'+id).subscribe(() => {
          this.ngOnInit();
          this.toastr.info('Produit deleted successfully', 'Produit deleted');
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
