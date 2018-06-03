import { DataSource } from '@angular/cdk/collections';
import { DoCheck, EventEmitter, IterableDiffer, IterableDiffers, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { MangolLayer } from './../../classes/layer.class';
import { MangolFeatureInfoTableElement } from './feature-info-table-element.interface';
import * as ol from 'openlayers';
export declare class MangolFeatureInfoTableComponent implements OnInit, DoCheck, OnDestroy {
    private iterableDiffers;
    dialog: MatDialog;
    class: string;
    features: ol.Feature[];
    layer: MangolLayer;
    featureSelected: EventEmitter<ol.Feature>;
    displayedColumns: string[];
    excludeColumns: string[];
    dataSource: MangolFeatureInfoTableDataSource;
    iterableDiffer: IterableDiffer<any>;
    constructor(iterableDiffers: IterableDiffers, dialog: MatDialog);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
    getColumnLabel(column: string): string;
    private _processFeatures();
    openTableDialog(): void;
    onRowClick(row: any, index: number): void;
}
export declare class MangolFeatureInfoTableDataSource extends DataSource<any> {
    connect(): Observable<MangolFeatureInfoTableElement[]>;
    disconnect(): void;
}
