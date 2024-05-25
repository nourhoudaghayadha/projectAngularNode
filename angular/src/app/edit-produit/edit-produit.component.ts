import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent {

  constructor(private _service:ProductServiceService,private r:ActivatedRoute , private router:Router){}

  produit:any;

  id= this.r.snapshot.paramMap.get("id");

  ngOnInit(): void {
    this._service.getProductById(this.id).subscribe(
      res=>{
          this.produit=res;
      },err=>{
        console.log(err);
        
      }
    )
  }
  edite(){
    this._service.update(this.id,this.produit).subscribe(
      res=>{
        this.produit=res;
        this.router.navigate(["/"])
      },err=>{
        console.log(err);
        
      }
    )
}

}