import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // private producs: Product[];
  private products: Array<Product>;
  private imgUrl = 'http://placehold.it/320X150';
  constructor() { }

  ngOnInit() {
    this.products = [
      new Product(1, '第一个商品', 1.99, 3.5, '这个是第一个商品，慕课网入门实战教程', ['文化', '娱乐']),
      new Product(2, '第二个商品', 2.99, 4.5, '这个是第二个商品，慕课网入门实战教程', ['电影', '音乐']),
      new Product(3, '第三个商品', 3.99, 2.5, '这个是第三个商品，慕课网入门实战教程', ['硬件', '电子产品']),
      new Product(4, '第四个商品', 4.99, 1.5, '这个是第四个商品，慕课网入门实战教程', ['电影', '娱乐']),
      new Product(5, '第五个商品', 5.99, 3.5, '这个是第五个商品，慕课网入门实战教程', ['文化', '电子产品']),
      new Product(6, '第六个商品', 6.99, 4.5, '这个是第六个商品，慕课网入门实战教程', ['硬件', '功夫']),
    ];
    this.products.push( new Product(7, '第七个商品', 6.99, 4.5, '这个是第七个商品，慕课网入门实战教程', ['电子产品', '电影']));
  }

}

export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>) {}
}
