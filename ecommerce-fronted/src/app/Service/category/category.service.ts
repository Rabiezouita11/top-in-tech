import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categories } from 'src/app/Models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url= 'api/categories/';
  public url2= '/api/auth/changer';
  constructor(private http:HttpClient) { }


  addCategory(category:any){
    return this.http.post(this.url+'/ajoutercategorie', category);
  }

  getAllCategories(){
    return this.http.get<categories[]>(this.url+'/affichercategorie');
  }

  deleteCategory(id:number){
    return this.http.delete(this.url+'/supprimercategorie/'+id);
  }

  getCategoryById(id:number){
    return this.http.get<categories>(this.url+'/findCategoriebyid/'+id);
  }

  updateCategory(id:number, category:any){
    return this.http.put(this.url+'/modifiercategorie/'+id, category);
  }


  changerpass( category:any){
    return this.http.put(this.url2, category);
  }

  


}
