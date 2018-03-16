# Component list
1. Slider


## How to use - Slider:

1. Install dependencies
```javascript
npm install hammerjs --save
```

DON'T forget to import to angular-cli:
```javascript
//.angular-cli.json

    "scripts": [
      "../node_modules/hammerjs/hammer.min.js"
    ]
```
2. Copy slider component to your project

3. Import slider to app module
```javascript
//app.module.ts

import { SliderComponent } from './slider/slider.component';
```

4. Import HammerJs for touch actions
```javascript
//app.module.ts

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
```

5. Import Angular animations
```javascript
//app.module.ts

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
```

6. Add declaration to handle HammerJs scroll event
```javascript
//app.module.ts

declare var Hammer: any;

export class MyHammerConfig extends HammerGestureConfig  {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: 'pan-y'
    });
    return mc;
  }
}
```

7. Add HammerJS to providers
```javascript
//app.module.ts

  {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }
```

## In the end your app.module file should look something like this
```javascript
//app.module.ts

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
```

8. Add slider component
```javascript
<mk-slider [config]="slideConfig" [slides]="slides"></mk-slider>
```

9. Format data before passing to slider component. Example of expected data format:
```javascript

  {
    "id": 1,
    "image": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?h=350&auto=compress&cs=tinysrgb",
    "thumbnail": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg?h=350&auto=compress&cs=tinysrgb",
    "title": "Slider 3",
    "description": "Short text"
  },
  {
    "id": 2,
    "image": "https://images.pexels.com/photos/301643/pexels-photo-301643.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    "thumbnail": "https://images.pexels.com/photos/301643/pexels-photo-301643.jpeg?w=940&h=650&auto=compress&cs=tinysrgb",
    "title": "Slider 4",
    "description": "Short text 4"
  }

```

# MkComponents - standard angular boilerplate below

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
