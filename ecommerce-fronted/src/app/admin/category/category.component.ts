import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Service/category/category.service';
import { categories } from './../../Models/categories';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public list!: categories[];
  public action !: string;
  constructor(private CategoryService:CategoryService, private toastr: ToastrService , private currentRoute: ActivatedRoute  ) { }

  ngOnInit(): void {



    this.CategoryService.getAllCategories().subscribe(
      (data:categories[])=>{
        this.list=data;
      }
    )

  }
  delete(cat:categories){

// how confirm delete in angular 13 ? with sweetalert2  ?


    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CategoryService.deleteCategory(cat.id).subscribe(
          ()=>{

            let i= this.list.indexOf(cat)
            this.list.splice(i,1)

          }

        );
        this.ngOnInit();
        this.toastr.info('Category deleted successfully', 'Category deleted');
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )



      }
    }



)};

}

