import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ComponentComponent } from './component/component.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidbarComponent } from './sidbar/sidbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { AjouterProductComponent } from './product/ajouter-product/ajouter-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { AjouterCategoryComponent } from './category/ajouter-category/ajouter-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizComponent } from './quiz/quiz.component';
import { AjouterQuizComponent } from './quiz/ajouter-quiz/ajouter-quiz.component';
import { UpdateQuizComponent } from './quiz/update-quiz/update-quiz.component';
import { PromotionComponent } from './promotion/promotion.component';
import { AjouterPromotionComponent } from './promotion/ajouter-promotion/ajouter-promotion.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent } from './contact/contact.component';
import { NgChartsModule } from 'ng2-charts';
import { AvisComponent } from './avis/avis.component';
@NgModule({
  declarations: [
    QuizComponent,
    ComponentComponent,
    HeaderComponent,
    FooterComponent,
    SidbarComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    AjouterProductComponent,
    UpdateProductComponent,
    AjouterCategoryComponent,
    AjouterQuizComponent,
    UpdateQuizComponent,
    PromotionComponent,
    AjouterPromotionComponent,
    ClientComponent,
    ContactComponent,
    AvisComponent
  ],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, FormsModule , NgChartsModule],
})




export class AdminModule {}
