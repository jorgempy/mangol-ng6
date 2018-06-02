
import {throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';


import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MangolFeatureIntoService {
  activateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: Http) {}

  getFeatureInfo(url: string) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http
      .get(url, {
        headers: headers
      })
      .pipe(
        map((response: Response) => {
          const resp = response.json();
          return resp;
        }),
        catchError((error: Response) => {
          console.log(error);
          return observableThrowError(error);
        })
      );
  }
}
