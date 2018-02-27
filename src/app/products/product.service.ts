import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IProduct } from "./product";
import { Observable } from "rxjs/Observable";
//import "rxjs/add/operator/throw";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class ProductService {

  private productUrl = "./api/products/products.json";

  constructor(private http: HttpClient) {
  }

  //the observable type is required here.
  //getProducts is returning an observable from the productUrl
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(id: number): Observable<IProduct> {
    return this.getProducts()
      .map((products: IProduct[]) => products.find(p => p.productId === id));
  }


  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
