import {Component, Input, OnInit} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  private stars: boolean[];
  @Input() private rating = 1;
  constructor() { }

  ngOnInit() {
    this.stars = [];
    for (let i = 1; i <= 5; i++ ) {
      this.stars.push(i > this.rating);
    }
  }
}
