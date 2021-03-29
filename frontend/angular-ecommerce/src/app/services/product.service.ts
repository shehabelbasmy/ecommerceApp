import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { Page } from '../common/page';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl = `http://localhost:8080/api/products`;

  currentCategoryId: number;

  constructor(private httpClient: HttpClient) { }

  private getProductList(url: string): Observable<Product[]> {

    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    )

  }

  getProductListOfCategory(categoryId: number): Observable<Product[]> {

    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    return this.getProductList(url);
  }

  searhProducts(keyword: string): Observable<Product[]> {

    const url = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`

    return this.getProductList(url);
  }

  getSingleProduct(productId): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`

    return this.httpClient.get<Product>(url)
  }

  getProductListPagenation(pageNumber: number,
    pageSize: number,
    categoryId: number): Observable<GetResponse> {
    console.log(pageNumber)
    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${pageNumber}&size=${pageSize}`
    // console.log(url)
    return this.httpClient.get<GetResponse>(url)

  }
  searchProductPaginate(pageNumber: number,
                        pageSize: number,
                        keyWord: string): Observable<GetResponse> {

    const url = `${this.baseUrl}/search/findByNameContaining?name=${keyWord}&page=${pageNumber}&size=${pageSize}`
    // console.log(url)
    return this.httpClient.get<GetResponse>(url)

  }

}

interface GetResponse {
  _embedded: {
    products: Product[]
  },
  page: Page
}