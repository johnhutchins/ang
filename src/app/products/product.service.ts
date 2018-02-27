import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IProduct } from "./product";
import { Observable } from "rxjs/Observable";
//import "rxjs/add/operator/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { HttpErrorResponse } from "@angular/common/http";


//const productJSON = "./api/products/products.json";

@Injectable()
export class ProductService {

  private productUrl = "./api/products/products.json";

  products: any;


  constructor(private http: HttpClient) {
    //let productList: any = this.http.get(this.productJSON);
    //this.products = productList;
  }


  //the observable type is required here.
  //getProducts is returning an observable from the productUrl
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl)
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
