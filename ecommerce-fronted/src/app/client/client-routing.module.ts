import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../client/dashboard/dashboard.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutComponent} from "./about/about.component";
import {ProfileComponent} from "./profile/profile.component";
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {SingleCategorieComponent} from "./single-categorie/single-categorie.component";
import {SinglepageProductComponent} from "./singlepage-product/singlepage-product.component";
import {QuizComponent} from "./quiz/quiz.component";
import {AdresseComponent} from "./adresse/adresse.component";
import {AjouterAdresseComponent} from "./adresse/ajouter-adresse/ajouter-adresse.component";
import {UpdateAdresseComponent} from "./adresse/update-adresse/update-adresse.component";
import {HistoriqueComponent} from "./historique/historique.component";
import {AvisComponent} from "./avis/avis.component";
import { GuardGuard } from '../auth/guard/guard.guard';
import { ChangermotdepaseeComponent } from './changermotdepasee/changermotdepasee.component';
import { ReponseComponent } from './quiz/reponse/reponse.component';
import { OrderComponent } from './checkout/order/order.component';



const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full' , data: {title: 'accueil'}},
  { path: 'accueil', component: DashboardComponent , data: {title: 'accueil'}  }   ,
  { path: 'contactClient', component: ContactComponent, data: {title: 'accueil'}  , canActivate : [GuardGuard]},
  { path: 'changermotdepasse', component: ChangermotdepaseeComponent, data: {title: 'accueil'}  , canActivate : [GuardGuard] },
  { path: 'about us', component: AboutComponent, data: {title: 'accueil'}},
  { path: 'profileClient', component: ProfileComponent, data: {title: 'accueil'} , canActivate : [GuardGuard]},
  { path: 'cart', component: CartComponent, data: {title: 'accueil'}, canActivate : [GuardGuard]},
  { path: 'checkout', component: CheckoutComponent, data: {title: 'accueil'}, canActivate : [GuardGuard]},
  { path: 'singelCategorie/:id', component: SingleCategorieComponent, data: {title: 'accueil'}},
  { path: 'singleProduct/:id', component: SinglepageProductComponent, data: {title: 'accueil'}},
  { path: 'Quiz/:id', component:ReponseComponent , data: {title: 'accueil'}},

  { path: 'quiz', component: QuizComponent, data: {title: 'accueil'} , canActivate : [GuardGuard]},
  { path: 'adresse', component: AdresseComponent, data: {title: 'accueil'}, canActivate : [GuardGuard]},
  { path: 'ajouteradresse', component: AjouterAdresseComponent, data: {title: 'accueil'}, canActivate : [GuardGuard]},
  { path: 'updateadresse', component: UpdateAdresseComponent, data: {title: 'accueil'}, canActivate : [GuardGuard]},
  { path: 'Historique', component: HistoriqueComponent, data: {title: 'accueil'}, canActivate : [GuardGuard]},
  { path: 'avis', component: AvisComponent, data: {title: 'accueil'}, canActivate : [GuardGuard]},

  {path: 'order/:id', component: OrderComponent, data: {title: 'accueil'}, canActivate : [GuardGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ClientRoutingModule { }
