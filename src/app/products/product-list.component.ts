import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: "pm-products",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})

export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  border: any[] = [2 ? 'solid' : 'black'];
 
  showImage: boolean = false;
  errorMessage: string;
  
  //the below will get and set the values for the list filter.
  _listFilter: string;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  //without the constructor here, no products will show. we need to make sure we initialize the products list
  //by using the constructor. simply setting the filteredProducts list to the products array 
  constructor(private productService: ProductService) {
    this.filteredProducts = this.products;
    this.listFilter = " ";
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    console.log(message);
    //this.pageTitle = "Product list: " + message;
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(products => {
        this.products = products;
          this.filteredProducts = this.products;
        },
      error => this.errorMessage = <any>error);
    //this.filteredProducts = this.products;
  }
}
