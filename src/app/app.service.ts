import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  sidebarOpenedSubject = new BehaviorSubject<boolean>(null);

  constructor() {}
}
