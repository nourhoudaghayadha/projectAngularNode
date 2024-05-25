import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { ActivatedRoute, Router} from '@angular/router';
import { ModelProduit } from '../Model/model-produit';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent {
  constructor( private _service:ProductServiceService, private r:ActivatedRoute,private router:Router){
  }
  produit:any;
  idprod:any;

  ngOnInit(): void {
    this.idprod=this.r.snapshot.paramMap.get('id');
    this._service.getProductById(this.r.snapshot.paramMap.get('id')).subscribe(
    res=>{
        this.produit=res;
      },err=>{
        console.log(err);
        
      }
    )
  }

  delete(id:any){
    this._service.delete(id).subscribe(
      res=>{
        console.log(id);
        //get the new update 
        this.router.navigate(['/']);
      },err=>{
        console.log(err);
        
      }
    )
  }
}
