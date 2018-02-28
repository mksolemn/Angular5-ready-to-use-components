import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'mk-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideState', [
      state('initial', style({
        opacity: 1,
        transform: 'translate(0%)'
      })),
      state('slideLeft', style({
        opacity: 1,
        transform: 'translate(0%)'
      })),
      transition('initial <=> slideLeft', animate('500ms ease-in-out', keyframes([
        style({opacity: 0.2, transform: 'translateX(75%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(-35px)',  offset: 0.5}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1})
      ])))
    ])
  ]
})
export class SliderComponent implements OnInit, OnChanges {
  @Input() config;
  @Input() slides: [any];

  public renderedSlides;
  public currentSlide = 1;
  public nextSlide = this.currentSlide + 1;
  public slideTimer;
  public slideState = 'initial';

// constant for swipe action: left or right
  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.renderedSlides = this.formatData(this.slides);
  }

  formatData(slides) {
    if (slides) {
      const formattedSlides = [];
      slides.map((val, i) => {
        val._slider_id = i;
        formattedSlides.push(val);
      });
      this.autoSlide();
      return formattedSlides;
    }
  }

  autoSlide() {
    this.slideTimer = setTimeout(() => {
      console.log('auto slide interval');
      if (this.currentSlide < this.renderedSlides.length) {
        this.currentSlide += 1;
        this.nextSlide = this.currentSlide + 1;
      } else {
        this.currentSlide = 1;
        this.nextSlide = this.currentSlide + 1;
      }
      this.autoSlide();
      this.animateTransition();
    }, this.config.autoSlide);

  }

  onMainHover(e, direction) {
    if (e.type === 'mouseover') {
      clearTimeout(this.slideTimer);
    } else if (e.type === 'mouseout') {
      clearTimeout(this.slideTimer);
      this.autoSlide();
    }
  }

  onControlClick(direction) {
    clearTimeout(this.slideTimer);
    if (direction === 'forward') {
      if (this.currentSlide < this.renderedSlides.length) {
        this.currentSlide += 1;
        this.nextSlide = this.currentSlide + 1;
        this.slideState = 'slideInLeft';
      } else {
        this.currentSlide = 1;
        this.nextSlide = this.currentSlide + 1;
      }

    } else if (direction === 'back') {
      if (this.currentSlide === 1) {
        this.currentSlide = this.renderedSlides.length;
        this.nextSlide = this.currentSlide - 1;
      } else {
        this.currentSlide -= 1;
        this.nextSlide = this.currentSlide + 1;
      }
    }
  }

  swipe(action) {
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.onControlClick('forward');
    }
    if (action === this.SWIPE_ACTION.LEFT) {
      this.onControlClick('back');
    }
  }

  animateTransition() {
    this.slideState === 'initial' ? this.slideState = 'slideLeft' : this.slideState = 'initial';
  }

}
