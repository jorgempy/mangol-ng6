import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MangolMeasureService {
  activateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}
}
