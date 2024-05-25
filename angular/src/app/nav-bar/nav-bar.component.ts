import { Component } from '@angular/core';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
constructor(private _service:ProductServiceService){}
ProductName:string ="";
        


search() {
 this._service.searchInput = this.ProductName;
 //use the nest of the bahavior to notifies the subscriber 
 this._service.searchBarTouchedSubject.next(this.ProductName);
}



}