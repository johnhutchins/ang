import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/pairwise";

import {IProduct} from "./product";
import { ProductService } from "./product.service";


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: IProduct;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit() {
    const param = +this.route.snapshot.paramMap.get('id');

    //checks to see if the route map has an id...
    //if it does, get the product from the product service and load it in the view
    if (param) {
      const id = +param;
      this.getProduct(id);
    }
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);

      this.router.events
      .filter((e: any) => e instanceof RoutesRecognized)
      .pairwise()
      .subscribe((e: any) => {
        console.log(e[0].url);
        //console.log("first route is: ", e[0], ". Second is: ", e[1]);
      });
  }
}
