import { Observable, BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';
export declare class MangolFeatureIntoService {
    private http;
    activateState$: BehaviorSubject<boolean>;
    constructor(http: Http);
    getFeatureInfo(url: string): Observable<any>;
}
