import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from '../product-service.service';
import { ModelProduit } from '../Model/model-produit';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.css']
})
export class AjouterProduitComponent {



  constructor(public _service: ProductServiceService, private router: Router) {}

  produit = new ModelProduit();

  save() {
    this._service.createProduct(this.produit).subscribe(
        res => {
            console.log(res);
            this.router.navigate(['/listProduct']);
        },
        err => {
            console.log(err);
        }
    );
}

}