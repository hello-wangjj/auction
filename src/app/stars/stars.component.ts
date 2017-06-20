import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  private stars: boolean[];
  @Input() private rating = 0;
  @Input() readonly = true;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.stars = [];
    for (let i = 1; i <= 5; i++ ) {
      this.stars.push(i > this.rating);
    }
  }
  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }
}
