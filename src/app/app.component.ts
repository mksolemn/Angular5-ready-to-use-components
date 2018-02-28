import {Component, OnInit} from '@angular/core';
import {LocalDataService} from './services/local-data.service';

@Component({
  selector: 'mk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public slides;
  public slideConfig = {
    contentCountPerSlide: 2,
    startingSlide: 2,
    autoSlide: 4000,
    arrowSingle: 'assets/icons/control.svg'
  }

  constructor(private localData: LocalDataService){
    this.localData.dispatchSlides().subscribe((val) => {
      console.log('slides: ', val);
      this.slides = val;
    });
  }

  ngOnInit(){

  }
}
