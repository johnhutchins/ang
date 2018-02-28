import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from "@angular/router";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/pairwise";

import {IProduct} from "./product";
import { ProductService } from "./product.service";
import { PageTrackerService } from "../shared/page-tracker.service";


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: IProduct;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private pageTrackerService: PageTrackerService) { }

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
  }

  onSave(){
    //call function that has stored the previous route...
    console.log("The referring page is: ", this.pageTrackerService.referringLink);



    //change that data to JSON format
    //Send it to a local file
    //should include the product details as well as the previous route

  }
}
