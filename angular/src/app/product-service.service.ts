import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelProduit } from './Model/model-produit';
import { BehaviorSubject,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  private getHttpOptions() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  private url = 'http://localhost:3000/api/';
  

  products:any;
  //initialase BehaviorSubject to follow the change of the search 
  searchBarTouchedSubject = new BehaviorSubject<String>("");
  //convet the value to observable to allow other parte to know if the value change
  searchBarTouched$ = this.searchBarTouchedSubject.asObservable();

  searchInput!: string;

  
  getProduit(): Observable<ModelProduit[]> {
    return this.http.get<ModelProduit[]>(this.url + 'GetProduct',this.getHttpOptions())
  
    ;
  }
  createProduct(product: ModelProduit): Observable<any> {
    return this.http.post(this.url + 'AddProduct', product ,this.getHttpOptions());
}



  delete(id: any): Observable<any> {
    return this.http.delete(this.url + 'id/' + id, this.getHttpOptions());
  }

  getProductById(id: any): Observable<ModelProduit> {
    return this.http.get<ModelProduit>(this.url + 'id/' + id, this.getHttpOptions());
  }

  update(id: any, prodData: any): Observable<any> {
    return this.http.put(this.url + 'id/' + id, prodData, this.getHttpOptions());
  }

  searchByName(productName: string): Observable<ModelProduit[]> {
    return this.http.get<ModelProduit[]>(`${this.url}search/${productName}`, this.getHttpOptions())
  
  
  }
}