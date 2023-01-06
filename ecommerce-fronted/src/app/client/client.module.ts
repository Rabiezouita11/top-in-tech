import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ComponentClientComponent } from './component-client/component-client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SingleCategorieComponent } from './single-categorie/single-categorie.component';
import { SinglepageProductComponent } from './singlepage-product/singlepage-product.component';
import { QuizComponent } from './quiz/quiz.component';
import { AdresseComponent } from './adresse/adresse.component';
import { AjouterAdresseComponent } from './adresse/ajouter-adresse/ajouter-adresse.component';
import { UpdateAdresseComponent } from './adresse/update-adresse/update-adresse.component';
import { HistoriqueComponent } from './historique/historique.component';
import { AvisComponent } from './avis/avis.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChangermotdepaseeComponent } from './changermotdepasee/changermotdepasee.component';
import { ReponseComponent } from './quiz/reponse/reponse.component';
import { OrderComponent } from './checkout/order/order.component';





@NgModule({
  declarations: [



        HeaderComponent,
        FooterComponent,
        ComponentClientComponent,
        DashboardComponent,
        ContactComponent,
        AboutComponent,
        ProfileComponent,
        CartComponent,
        CheckoutComponent,
        SingleCategorieComponent,
        SinglepageProductComponent,
        QuizComponent,
        AdresseComponent,
        AjouterAdresseComponent,
        UpdateAdresseComponent,
        HistoriqueComponent,
        AvisComponent,
        ChangermotdepaseeComponent,
        ReponseComponent,
        OrderComponent,
        
  ],
  providers: [DatePipe],
  imports: [


    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ]
})
export class ClientModule { }
