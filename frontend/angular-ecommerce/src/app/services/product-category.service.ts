import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  baseUrl:string= "http://localhost:8080/api/product-category"

  constructor(private httpClient:HttpClient) { }

  getProductCategory() :Observable<ProductCategory[]>{
    
    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response=>response._embedded.productCategory)
    )
  
  }
}

interface GetResponse{

  _embedded:{
    productCategory:ProductCategory[]
  }

}