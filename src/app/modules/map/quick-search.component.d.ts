import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { MangolMap } from '../../classes/map.class';
import { MangolConfigMapControllerQuickSearch, MangolConfigMapControllerQuickSearchItem } from '../../interfaces/config-map-controllers.interface';
export declare class MangolQuickSearchComponent implements OnInit {
    class: string;
    map: MangolMap;
    opts: MangolConfigMapControllerQuickSearch;
    items: MangolConfigMapControllerQuickSearchItem[];
    filteredOptionsObservable: Observable<MangolConfigMapControllerQuickSearchItem[]>;
    filteredOptions: MangolConfigMapControllerQuickSearchItem[];
    placeholder: string;
    formControl: FormControl;
    constructor();
    ngOnInit(): void;
    private _filter(val);
    onOptionSeleted($event: MatAutocompleteSelectedEvent): void;
    private _zoomToCoordinates(selected);
    private _zoomToExtent(selected);
}
