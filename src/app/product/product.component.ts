import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../shared/product.service";
import {FormControl} from "@angular/forms";
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // private producs: Product[];
   products: Product[];
   imgUrl = 'http://placehold.it/320X150';
   keyword: string;
   titleFilter: FormControl = new FormControl();
  constructor(private productService: ProductService) {
    this.titleFilter.valueChanges.debounceTime(500)
      .subscribe(
      value => this.keyword = value
    );
  }

  ngOnInit() {
    // 改造
    // this.productService.getProducts().then(
    //   products => this.products = products
    // );
    this.productService.getProducts().subscribe(
      (data) => this.products = data
    );
    this.productService.searchEvent.subscribe(
      params => {
        this.productService.search(params).subscribe(data => this.products = data);
      }
    );
  }

}


