import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {LocalDataService} from './services/local-data.service';


// slider - BEGIN
import { SliderComponent } from './slider/slider.component';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// slider - END

declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });
    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    LocalDataService,
    {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
