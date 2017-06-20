import {EventEmitter, Injectable} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class ProductService {
  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();
  // 从服务器拿数据
  // products: Product[] = [
  //   new Product(1, '第一个商品', 1.99, 3.5, '这个是第一个商品，慕课网入门实战教程', ['文化', '娱乐']),
  //   new Product(2, '第二个商品', 2.99, 4.5, '这个是第二个商品，慕课网入门实战教程', ['电影', '音乐']),
  //   new Product(3, '第三个商品', 3.99, 2.5, '这个是第三个商品，慕课网入门实战教程', ['硬件', '电子产品']),
  //   new Product(4, '第四个商品', 4.99, 1.5, '这个是第四个商品，慕课网入门实战教程', ['电影', '娱乐']),
  //   new Product(5, '第五个商品', 5.99, 3.5, '这个是第五个商品，慕课网入门实战教程', ['文化', '电子产品']),
  //   new Product(6, '第六个商品', 6.99, 4.5, '这个是第六个商品，慕课网入门实战教程', ['硬件', '电影']),
  // ];
  // comments: Comment[] = [
  //   new Comment(1, 1, '2017-05-13', 'wangjj', 4.5, '不错的商品'),
  //   new Comment(2, 1, '2017-04-13', 'wangjj2', 3.5, '不错的商品2'),
  //   new Comment(3, 1, '2017-01-13', 'wangjj3', 2.5, '不错的商品3'),
  //   new Comment(4, 2, '2017-02-13', 'wangjj4', 3.5, '不错的商品4'),
  //   new Comment(5, 2, '2017-03-13', 'wangjj5', 4.5, '不错的商品5'),
  //   new Comment(6, 3, '2017-07-13', 'wangjj6', 6.5, '不错的商品6'),
  //   new Comment(7, 3, '2017-03-13', 'wangjj7', 4.5, '不错的商品7'),
  // ];
  constructor(private http: Http) {}
  // 改造get products
  // getProducts(): Promise<Product[]> {
  //   return Promise.resolve(this.products);
  // }
  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').map(res => res.json());

  }
  // 改造get product
  // getProduct(id: number): Promise<Product> {
  //   return Promise.resolve(this.products.find(
  //     (product: Product) => product.id === Number(id)
  //   ));
  //
  // }
  // getProduct2(id: number): Product {
  //   return this.products.find(
  //     (product: Product) => product.id === Number(id)
  //   );
  // }
  getProduct(id: number): Observable<Product> {
    return this.http.get('/api/product/' + id).map(res => res.json());
  }
// 改造get CommentForProduct
//   getCommentForProduct(id: number): Comment[] {
//     return this.comments.filter(
//       (comment: Comment) => comment.productId === Number(id)
//     );
//   }
  getCommentForProduct(id: number): Observable<Comment[]> {
    return this.http.get('/api/product/' + id + '/comments').map(res => res.json());
  }
  getAllCategories(): string[] {
    return ['文化', '娱乐', '电影', '音乐', '硬件', '电子产品'];
  }
  // 搜索商品
  search(params: ProductSearchParams): Observable<Product[]> {
    console.log('search products', this.encodeParams(params));
    return this.http.get('/api/products', {params: this.encodeParams(params)}).map(res => res.json());
  }
  private encodeParams(params: ProductSearchParams) {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: URLSearchParams, key: string) => {
      sum.append(key, params[key]);
      return sum;
      }, new URLSearchParams());
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

export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {}
}
export class ProductSearchParams {
  constructor(public title: string, public price: number, public category: string) {}
}
