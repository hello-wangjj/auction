import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Comment, Product, ProductService} from "../shared/product.service";
import {WebSocketService} from "../shared/web-socket.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // private productTitle: string;
  product: Product;
  productId: number;
  productPrice: number;
  productTitle: string;
  productDesc: string;
  productRating: number;
  comments: Comment[];
  newRating = 5;
  newComment = '';
  isCommentHidden = true;
  isWatched = false;
  currentBid: number;
  subscription: Subscription;
  constructor(private routeInfo: ActivatedRoute, private productService: ProductService, private wsService: WebSocketService) { }

  ngOnInit() {
    this.routeInfo.params.subscribe(
      (params: Params) => {
        this.productId = params['productId'];
      }
    );
   // 改造
   // this.productService.getProduct(this.productId).then(
   //   (product: Product) => {
   //     this.productPrice = product.price;
   //     this.productTitle = product.title;
   //     this.productDesc = product.desc;
   //     this.productRating = product.rating;
   //   }
   // );
   // this.product = this.productService.getProduct2(this.productId);
   // this.comments = this.productService.getCommentForProduct(this.productId);
    this.productService.getProduct(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.currentBid = product.price;
      }
    );
    this.productService.getCommentForProduct(this.productId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      }
    );
  }
  onAddComment() {
    const comment = new Comment(0, this.productId, new Date().toString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);
    const sum = this.comments.reduce((currentsum, comment_) => currentsum + comment_.rating, 0);
    this.product.rating = sum / this.comments.length;

    this.newRating = 5;
    this.newComment = null;
    this.isCommentHidden = true;
  }
  watchProduct() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = !this.isWatched;
      this.subscription = this.wsService.createObservableSocket("ws://localhost:8085", this.product.id).subscribe(products => {
        const product = products.find(p => p.productId === this.product.id);
        this.currentBid = product.bid;
      });
    }
  }
}
