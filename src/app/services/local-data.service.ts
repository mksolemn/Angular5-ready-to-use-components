import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class LocalDataService {
  public carouselSlides = './assets/data/carousel_slides.json';

  carouselSlidesSubject: Subject<any> = new ReplaySubject<any>(1);

  constructor(private http: HttpClient) {
    // get local data files on init
    this.http
      .get(this.carouselSlides)
      .map((val) => {
        this.carouselSlidesSubject.next(val);
      })
      .take(1)
      .subscribe();
  }

  dispatchSlides(): Observable<[any]> {
    return this.carouselSlidesSubject.asObservable();
  }
}
