import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProduitComponent } from './list-produit/list-produit.component';
import { AjouterProduitComponent } from './ajouter-produit/AjouterProduitComponent';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard'; // You will create this guard next

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'listProduct', component: ListProduitComponent, canActivate: [AuthGuard] },
  {path:"AddProduct",component:AjouterProduitComponent},
  {path:"Details/:id",component:DetailsProduitComponent},
  {path:"UpdateProduct/:id",component:EditProduitComponent},
  {path: "login", component: LoginComponent},
  //NotFound

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
